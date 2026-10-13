// Petit compilateur d'expressions mathématiques pour le laboratoire.
// Analyse descendante récursive, sans eval ni Function : seules les variables
// x, y, t, les constantes pi et e, et une liste fermée de fonctions sont admises.

type Fn = (x: number, y: number, t: number) => number

const FUNCS: Record<string, { arity: number; fn: (...a: number[]) => number }> = {
  sin: { arity: 1, fn: Math.sin },
  cos: { arity: 1, fn: Math.cos },
  tan: { arity: 1, fn: Math.tan },
  abs: { arity: 1, fn: Math.abs },
  sqrt: { arity: 1, fn: (v) => Math.sqrt(Math.max(0, v)) },
  exp: { arity: 1, fn: (v) => Math.exp(Math.min(20, v)) },
  log: { arity: 1, fn: (v) => Math.log(Math.max(1e-9, v)) },
  floor: { arity: 1, fn: Math.floor },
  sign: { arity: 1, fn: Math.sign },
  atan: { arity: 1, fn: Math.atan },
  min: { arity: 2, fn: Math.min },
  max: { arity: 2, fn: Math.max },
  pow: { arity: 2, fn: (a, b) => Math.pow(Math.abs(a), b) },
  mod: { arity: 2, fn: (a, b) => (b === 0 ? 0 : a - b * Math.floor(a / b)) },
}

const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E }

type Token =
  | { k: 'num'; v: number; at: number }
  | { k: 'id'; v: string; at: number }
  | { k: 'op'; v: string; at: number }

export class ExprError extends Error {
  constructor(
    message: string,
    readonly at: number,
  ) {
    super(message)
  }
}

function tokenize(src: string): Token[] {
  const out: Token[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (/\s/.test(c)) {
      i++
      continue
    }
    if (/[0-9.]/.test(c)) {
      const m = /^(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(src.slice(i))
      if (!m) throw new ExprError('nombre mal formé', i)
      out.push({ k: 'num', v: parseFloat(m[0]), at: i })
      i += m[0].length
      continue
    }
    if (/[a-zA-Z_]/.test(c)) {
      const m = /^[a-zA-Z_][a-zA-Z0-9_]*/.exec(src.slice(i))!
      out.push({ k: 'id', v: m[0].toLowerCase(), at: i })
      i += m[0].length
      continue
    }
    if ('+-*/^(),'.includes(c)) {
      out.push({ k: 'op', v: c, at: i })
      i++
      continue
    }
    if (c === '−') {
      out.push({ k: 'op', v: '-', at: i })
      i++
      continue
    }
    if (c === '×' || c === '·') {
      out.push({ k: 'op', v: '*', at: i })
      i++
      continue
    }
    throw new ExprError(`caractère inattendu « ${c} »`, i)
  }
  return out
}

/** Compile une expression ; lève ExprError avec la position fautive. */
export function compile(src: string): { fn: Fn; usesTime: boolean } {
  if (src.length > 240) throw new ExprError('expression trop longue (240 caractères au plus)', 240)
  const tokens = tokenize(src)
  let p = 0
  let usesTime = false
  const peek = () => tokens[p]
  const isOp = (v: string) => peek()?.k === 'op' && peek()!.v === v
  const expect = (v: string) => {
    if (!isOp(v)) throw new ExprError(`« ${v} » attendu`, peek()?.at ?? src.length)
    p++
  }

  // expr := term (('+'|'-') term)*
  function expr(): Fn {
    let left = term()
    while (isOp('+') || isOp('-')) {
      const op = tokens[p++].v
      const a = left
      const b = term()
      left = op === '+' ? (x, y, t) => a(x, y, t) + b(x, y, t) : (x, y, t) => a(x, y, t) - b(x, y, t)
    }
    return left
  }
  // term := unary (('*'|'/') unary)*  — la multiplication implicite (2x, 3sin(x)) est admise
  function term(): Fn {
    let left = unary()
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = tokens[p++].v
        const a = left
        const b = unary()
        left = op === '*' ? (x, y, t) => a(x, y, t) * b(x, y, t) : (x, y, t) => {
          const d = b(x, y, t)
          return d === 0 ? 0 : a(x, y, t) / d
        }
        continue
      }
      const next = peek()
      if (next && (next.k === 'id' || (next.k === 'op' && next.v === '('))) {
        const a = left
        const b = unary()
        left = (x, y, t) => a(x, y, t) * b(x, y, t)
        continue
      }
      return left
    }
  }
  // unary := '-' unary | power
  function unary(): Fn {
    if (isOp('-')) {
      p++
      const a = unary()
      return (x, y, t) => -a(x, y, t)
    }
    if (isOp('+')) {
      p++
      return unary()
    }
    return power()
  }
  // power := atom ('^' unary)?
  function power(): Fn {
    const base = atom()
    if (isOp('^')) {
      p++
      const ex = unary()
      return (x, y, t) => {
        const b = base(x, y, t)
        const e = ex(x, y, t)
        const r = Math.pow(b, e)
        return Number.isFinite(r) ? r : 0
      }
    }
    return base
  }
  function atom(): Fn {
    const tk = peek()
    if (!tk) throw new ExprError('expression incomplète', src.length)
    if (tk.k === 'num') {
      p++
      const v = tk.v
      return () => v
    }
    if (tk.k === 'op' && tk.v === '(') {
      p++
      const inner = expr()
      expect(')')
      return inner
    }
    if (tk.k === 'id') {
      p++
      if (tk.v === 'x') return (x) => x
      if (tk.v === 'y') return (_x, y) => y
      if (tk.v === 't') {
        usesTime = true
        return (_x, _y, t) => t
      }
      if (tk.v in CONSTS) {
        const v = CONSTS[tk.v]
        return () => v
      }
      const f = FUNCS[tk.v]
      if (!f) throw new ExprError(`« ${tk.v} » inconnu`, tk.at)
      expect('(')
      const args: Fn[] = [expr()]
      while (isOp(',')) {
        p++
        args.push(expr())
      }
      expect(')')
      if (args.length !== f.arity)
        throw new ExprError(`${tk.v} attend ${f.arity} argument${f.arity > 1 ? 's' : ''}`, tk.at)
      const [a, b] = args
      return f.arity === 1 ? (x, y, t) => f.fn(a(x, y, t)) : (x, y, t) => f.fn(a(x, y, t), b(x, y, t))
    }
    throw new ExprError(`« ${tk.v} » inattendu`, tk.at)
  }

  if (tokens.length === 0) throw new ExprError('expression vide', 0)
  const fn = expr()
  if (p < tokens.length) throw new ExprError(`« ${tokens[p].v} » inattendu`, tokens[p].at)

  // Les valeurs non finies sont ramenées à 0 : la matière ne part jamais à l'infini.
  const safe: Fn = (x, y, t) => {
    const v = fn(x, y, t)
    return Number.isFinite(v) ? v : 0
  }
  return { fn: safe, usesTime }
}
