# ============================================================
#  Nexium Client - installateur automatique
#  Réinstallation propre + spinner + UI propre
# ============================================================

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$Repo      = "Omega-devj/nexium-client"
$ZipUrl    = "https://codeload.github.com/$Repo/zip/refs/heads/main"
$ApiUrl    = "https://api.github.com/repos/$Repo/releases/latest"
$Racine    = Join-Path $env:LOCALAPPDATA "Nexium"
$Dossier   = Join-Path $Racine "nexium-client-main"
$TempZip   = Join-Path $env:TEMP "nexium-client.zip"
$TempExtract = Join-Path $env:TEMP ("nexium_extract_" + [guid]::NewGuid().ToString("N"))
$Shortcut  = Join-Path ([Environment]::GetFolderPath("Desktop")) "Nexium Client.lnk"

$Host.UI.RawUI.WindowTitle = "Nexium Client - Installateur"

function Write-Blank { Write-Host "" }

function Titre([string]$t) {
    Write-Blank
    Write-Host ("  ╔" + ("═" * 62) + "╗") -ForegroundColor DarkCyan
    Write-Host ("  ║ " + $t.PadRight(61) + "║") -ForegroundColor Cyan
    Write-Host ("  ╚" + ("═" * 62) + "╝") -ForegroundColor DarkCyan
}

function Info([string]$t)   { Write-Host ("  • " + $t) -ForegroundColor Gray }
function Bon([string]$t)    { Write-Host ("  ✔ " + $t) -ForegroundColor Green }
function Souci([string]$t)  { Write-Host ("  ! " + $t) -ForegroundColor Yellow }
function Erreur([string]$t) { Write-Host ("  ✖ " + $t) -ForegroundColor Red }

function Show-Header {
    Clear-Host
    Write-Host ""
    Write-Host "   ███╗   ██╗███████╗██╗  ██╗██╗██╗   ██╗███╗   ███╗" -ForegroundColor Cyan
    Write-Host "   ████╗  ██║██╔════╝██║  ██║██║██║   ██║████╗ ████║" -ForegroundColor DarkCyan
    Write-Host "   ██╔██╗ ██║█████╗  ███████║██║██║   ██║██╔████╔██║" -ForegroundColor Cyan
    Write-Host "   ██║╚██╗██║██╔══╝  ██╔══██║██║██║   ██║██║╚██╔╝██║" -ForegroundColor DarkCyan
    Write-Host "   ██║ ╚████║███████╗██║  ██║██║╚██████╔╝██║ ╚═╝ ██║" -ForegroundColor Cyan
    Write-Host "   ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝     ╚═╝" -ForegroundColor DarkCyan
    Write-Host ""
    Write-Host "   Installation automatique" -ForegroundColor White
    Write-Host "   Client : $Repo" -ForegroundColor DarkGray
    Write-Host ""
}

function Stop2([string]$t) {
    Write-Blank
    Write-Host ("  ╔" + ("═" * 62) + "╗") -ForegroundColor DarkRed
    Write-Host ("  ║ " + "ERREUR".PadRight(61) + "║") -ForegroundColor Red
    Write-Host ("  ╚" + ("═" * 62) + "╝") -ForegroundColor DarkRed
    Erreur $t
    Write-Blank
    Read-Host "  Appuie sur Entrée pour fermer" | Out-Null
    exit 1
}

function Invoke-WithSpinner {
    param(
        [Parameter(Mandatory=$true)][string]$Message,
        [Parameter(Mandatory=$true)][scriptblock]$Action,
        [object[]]$ArgumentList = @()
    )

    $frames = @("⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏")

    $job = Start-Job -ScriptBlock {
        param($sb, $args)
        & $sb @args
    } -ArgumentList $Action, $ArgumentList

    $i = 0
    while ($job.State -eq "Running" -or $job.State -eq "NotStarted") {
        $frame = $frames[$i % $frames.Count]
        Write-Host -NoNewline ("`r  {0}  {1}" -f $frame, $Message) -ForegroundColor Cyan
        Start-Sleep -Milliseconds 85
        $i++
    }

    Write-Host ("`r  " + (" " * 100)) -NoNewline
    Write-Host "`r" -NoNewline

    Wait-Job $job | Out-Null
    try {
        Receive-Job $job -ErrorAction Stop | Out-Null
    } finally {
        Remove-Job $job -Force -ErrorAction SilentlyContinue | Out-Null
    }
}

function Ensure-Directory([string]$Path) {
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Remove-PathRobust([string]$Path, [int]$Retries = 8) {
    for ($i = 1; $i -le $Retries; $i++) {
        if (-not (Test-Path $Path)) { return $true }

        try {
            Remove-Item -LiteralPath $Path -Recurse -Force -ErrorAction Stop
        } catch {
            # On continue, on va retenter en fallback
        }

        if (Test-Path $Path) {
            try {
                & cmd.exe /c "rmdir /s /q `"$Path`"" | Out-Null
            } catch {
                # ignore
            }
        }

        if (-not (Test-Path $Path)) { return $true }
        Start-Sleep -Milliseconds (300 * $i)
    }

    return (-not (Test-Path $Path))
}

function Stop-NexiumProcesses {
    $pids = New-Object System.Collections.Generic.List[int]

    $names = @("Discord","DiscordCanary","DiscordPTB","DiscordDevelopment","Nexium")
    foreach ($n in $names) {
        Get-Process -Name $n -ErrorAction SilentlyContinue | ForEach-Object {
            if (-not $pids.Contains($_.Id)) { [void]$pids.Add($_.Id) }
        }
    }

    try {
        if (Test-Path $Racine) {
            Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
                $_.ExecutablePath -and $_.ExecutablePath.StartsWith($Racine, [StringComparison]::OrdinalIgnoreCase)
            } | ForEach-Object {
                if (-not $pids.Contains([int]$_.ProcessId)) { [void]$pids.Add([int]$_.ProcessId) }
            }
        }
    } catch {
        # pas bloquant
    }

    if ($pids.Count -gt 0) {
        Invoke-WithSpinner -Message "Fermeture des processus..." -Action {
            param($ids)
            $args = @('/F','/T')
            foreach ($id in $ids) { $args += "/PID"; $args += "$id" }
            & taskkill.exe @args | Out-Null
            Start-Sleep -Seconds 1
        } -ArgumentList @(@($pids.ToArray()))
    }
}

function Download-FilePretty {
    param(
        [Parameter(Mandatory=$true)][string]$Url,
        [Parameter(Mandatory=$true)][string]$OutFile,
        [Parameter(Mandatory=$true)][string]$Label
    )

    if (Test-Path $OutFile) { Remove-Item $OutFile -Force -ErrorAction SilentlyContinue }

    Invoke-WithSpinner -Message $Label -Action {
        param($u, $o)
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", "Nexium-Installer")
        try { $wc.DownloadFile($u, $o) } finally { $wc.Dispose() }
    } -ArgumentList @($Url, $OutFile)
}

Show-Header

# 1) Fermeture des processus
Titre "1/5  Vérification"
Info "Recherche des processus ouverts..."
Stop-NexiumProcesses
Bon "Aucun processus bloquant détecté"

# 2) Préparation / nettoyage complet
Titre "2/5  Préparation"

if (Test-Path $Racine) {
    Info "Ancienne installation détectée : suppression complète"

    if (-not (Remove-PathRobust $Racine)) {
        Stop2 "Suppression impossible. Ferme tout ce qui utilise Nexium, puis réessaie."
    }

    Bon "Ancienne installation supprimée"
} else {
    Info "Aucune ancienne installation détectée"
}

Ensure-Directory $Racine
Bon "Dossier d'installation prêt"

Ensure-Directory $TempExtract

# 3) Téléchargement
Titre "3/5  Téléchargement"
Info "Récupération de l'archive principale..."

try {
    Download-FilePretty -Url $ZipUrl -OutFile $TempZip -Label "Téléchargement du client..."
} catch {
    Stop2 "Téléchargement impossible. Vérifie ta connexion internet."
}

if (-not (Test-Path $TempZip) -or (Get-Item $TempZip).Length -lt 1MB) {
    Stop2 "Le fichier téléchargé est invalide."
}

$taille = [math]::Round((Get-Item $TempZip).Length / 1MB)
Bon ("Archive téléchargée (${taille} Mo)")

# 4) Extraction dans un dossier temporaire puis remplacement propre
Titre "4/5  Installation des fichiers"

try {
    Invoke-WithSpinner -Message "Extraction des fichiers..." -Action {
        param($zip, $dest)
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::ExtractToDirectory($zip, $dest)
    } -ArgumentList @($TempZip, $TempExtract)
} catch {
    Stop2 "Décompression impossible : $($_.Exception.Message)"
}

Remove-Item $TempZip -Force -ErrorAction SilentlyContinue

$extractedRoot = Get-ChildItem $TempExtract -Directory | Select-Object -First 1
if (-not $extractedRoot) {
    Stop2 "Le dossier extrait est introuvable."
}

try {
    Invoke-WithSpinner -Message "Placement de la nouvelle version..." -Action {
        param($src, $dst)
        if (Test-Path $dst) {
            Remove-PathRobust $dst | Out-Null
        }
        Move-Item -LiteralPath $src -Destination $dst -Force
    } -ArgumentList @($extractedRoot.FullName, $Dossier)
} catch {
    Stop2 "Impossible de finaliser l'installation."
}

Remove-Item $TempExtract -Recurse -Force -ErrorAction SilentlyContinue
Bon "Fichiers installés"

# 5) Récupération du lanceur + raccourci
Titre "5/5  Finalisation"

$exeUrl = $null
$exeNom = $null

try {
    Info "Recherche du lanceur dans les releases..."
    $head = @{
        "User-Agent" = "Nexium-Installer"
        "Accept"     = "application/vnd.github+json"
    }

    $rel = Invoke-RestMethod -Uri $ApiUrl -Headers $head -TimeoutSec 30

    foreach ($a in $rel.assets) {
        if ($a.name -match "\.exe$") {
            $exeUrl = $a.browser_download_url
            $exeNom = $a.name
            break
        }
    }
} catch {
    Souci "Page des releases injoignable"
}

if ($exeUrl) {
    $exePath = Join-Path $Dossier $exeNom
    try {
        Download-FilePretty -Url $exeUrl -OutFile $exePath -Label "Téléchargement du lanceur..."
        Bon "Lanceur installé : $exeNom"
    } catch {
        Souci "Téléchargement du lanceur impossible"
        $exeUrl = $null
    }
}

if (-not $exeUrl) {
    Souci "Le lanceur n'a pas pu être récupéré automatiquement."
    Info  "Télécharge-le ici : https://github.com/$Repo/releases"
    Info  "Puis place le .exe dans : $Dossier"
    Start-Process "https://github.com/$Repo/releases"
}

$exeLocal = Get-ChildItem $Dossier -Filter *.exe -ErrorAction SilentlyContinue | Select-Object -First 1
if ($exeLocal) {
    try {
        Invoke-WithSpinner -Message "Création du raccourci Bureau..." -Action {
            param($exeFullName, $workDir, $lnkPath)
            $sh = New-Object -ComObject WScript.Shell
            $sc = $sh.CreateShortcut($lnkPath)
            $sc.TargetPath = $exeFullName
            $sc.WorkingDirectory = $workDir
            $sc.Description = "Discord avec les mods Nexium"
            $sc.Save()
        } -ArgumentList @($exeLocal.FullName, $Dossier, $Shortcut)

        Bon "Raccourci créé sur le Bureau"
    } catch {
        Souci "Raccourci non créé (sans conséquence)"
    }
}

Write-Blank
Write-Host ("  " + ("=" * 64)) -ForegroundColor Green
Write-Host "  Installation terminée" -ForegroundColor Green
Write-Host ("  " + ("=" * 64)) -ForegroundColor Green
Write-Blank
Info "Emplacement : $Dossier"
Write-Blank

if ($exeLocal) {
    $rep = Read-Host "  Lancer Nexium maintenant ? (O/n)"
    if ($rep -eq "" -or $rep -match "^[oOyY]") {
        Start-Process -FilePath $exeLocal.FullName -WorkingDirectory $Dossier
        Bon "Nexium démarre"
        Start-Sleep -Seconds 2
    }
} else {
    Read-Host "  Appuie sur Entrée pour fermer" | Out-Null
}
