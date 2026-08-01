# ============================================================
#  Nexium Client - installateur automatique
# ============================================================

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$Repo      = "Omega-devj/nexium-client"
$ZipUrl    = "https://codeload.github.com/$Repo/zip/refs/heads/main"
$ApiUrl    = "https://api.github.com/repos/$Repo/releases/latest"
$Racine    = Join-Path $env:LOCALAPPDATA "Nexium"
$Dossier   = Join-Path $Racine "nexium-client-main"
$TempZip   = Join-Path $env:TEMP "nexium-client.zip"
$TempKeep  = Join-Path $env:TEMP "nx_garde"

$Host.UI.RawUI.WindowTitle = "Nexium Client - Installateur"

# ============================
# UI
# ============================
function Write-Blank { Write-Host "" }

function Titre([string]$t) {
    Write-Blank
    Write-Host ("  ╔" + ("═" * 60) + "╗") -ForegroundColor DarkCyan
    Write-Host ("  ║ " + $t.PadRight(59) + "║") -ForegroundColor Cyan
    Write-Host ("  ╚" + ("═" * 60) + "╝") -ForegroundColor DarkCyan
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
    Write-Host ("  ╔" + ("═" * 60) + "╗") -ForegroundColor DarkRed
    Write-Host ("  ║ " + "ERREUR".PadRight(59) + "║") -ForegroundColor Red
    Write-Host ("  ╚" + ("═" * 60) + "╝") -ForegroundColor DarkRed
    Erreur $t
    Write-Blank
    Read-Host "  Appuie sur Entrée pour fermer" | Out-Null
    exit 1
}

# ============================
# Spinner / task runner
# ============================
function Invoke-SpinnerTask {
    param(
        [Parameter(Mandatory=$true)][string]$Message,
        [Parameter(Mandatory=$true)][scriptblock]$ScriptBlock
    )

    $frames = @("⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏")
    $job = Start-Job -ScriptBlock $ScriptBlock

    $i = 0
    while ($job.State -eq "Running" -or $job.State -eq "NotStarted") {
        $frame = $frames[$i % $frames.Count]
        Write-Host -NoNewline ("`r  {0}  {1}" -f $frame, $Message) -ForegroundColor Cyan
        Start-Sleep -Milliseconds 90
        $i++
    }

    # Nettoyage ligne spinner
    Write-Host ("`r  " + (" " * 90)) -NoNewline
    Write-Host "`r" -NoNewline

    $result = $null
    try {
        $result = Receive-Job $job -ErrorAction Stop
    } catch {
        Remove-Job $job -Force -ErrorAction SilentlyContinue | Out-Null
        throw
    }

    Remove-Job $job -Force -ErrorAction SilentlyContinue | Out-Null
    return $result
}

function Show-SpinnerOK([string]$Text) {
    Write-Host ("  ✔  $Text") -ForegroundColor Green
}

function Show-SpinnerWarn([string]$Text) {
    Write-Host ("  !  $Text") -ForegroundColor Yellow
}

function Show-SpinnerInfo([string]$Text) {
    Write-Host ("  •  $Text") -ForegroundColor Gray
}

# ============================
# Helpers
# ============================
function Ensure-Directory([string]$Path) {
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Download-FilePretty {
    param(
        [Parameter(Mandatory=$true)][string]$Url,
        [Parameter(Mandatory=$true)][string]$OutFile,
        [Parameter(Mandatory=$true)][string]$Label
    )

    if (Test-Path $OutFile) {
        Remove-Item $OutFile -Force -ErrorAction SilentlyContinue
    }

    Invoke-SpinnerTask -Message $Label -ScriptBlock {
        param($Url, $OutFile)

        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", "Nexium-Installer")
        try {
            $wc.DownloadFile($Url, $OutFile)
        } finally {
            $wc.Dispose()
        }
    }.GetNewClosure().Invoke($Url, $OutFile) | Out-Null
}

# ============================
# Start
# ============================
Show-Header

# --- 0) Discord doit etre ferme ---
Titre "1/5  Verification"
Show-SpinnerInfo "Recherche des processus ouverts..."

$noms = @("Discord","DiscordCanary","DiscordPTB","DiscordDevelopment","Nexium")
$proc = Get-Process -Name $noms -ErrorAction SilentlyContinue

if (-not $proc -and (Test-Path $Dossier)) {
    $proc = Get-Process -ErrorAction SilentlyContinue | Where-Object {
        $_.Path -and $_.Path.StartsWith($Dossier, [StringComparison]::OrdinalIgnoreCase)
    }
}

if ($proc) {
    Show-SpinnerWarn "Discord est ouvert, fermeture..."
    try {
        Invoke-SpinnerTask -Message "Fermeture des processus..." -ScriptBlock {
            param($procIds)
            foreach ($id in $procIds) {
                try { Stop-Process -Id $id -Force -ErrorAction SilentlyContinue } catch {}
            }
            Start-Sleep -Seconds 1
        }.GetNewClosure().Invoke(@($proc | Select-Object -ExpandProperty Id)) | Out-Null

        Bon "Discord ferme"
    } catch {
        Stop2 "Impossible de fermer Discord. Ferme-le a la main puis relance ce script."
    }
} else {
    Bon "Aucun processus bloquant detecte"
}

# --- 1) Dossier d'installation ---
Titre "2/5  Preparation"
$maj = Test-Path $Dossier

if ($maj) {
    Info "Installation existante detectee : mise a jour"
    Ensure-Directory $TempKeep

    $garde = @(".nexium-dev", ".nexium-update.json", ".nexium-update.log")

    try {
        Invoke-SpinnerTask -Message "Sauvegarde des fichiers personnels..." -ScriptBlock {
            param($Dossier, $TempKeep, $garde)
            foreach ($g in $garde) {
                $src = Join-Path $Dossier "resources\equicord\$g"
                if (Test-Path $src) {
                    Copy-Item $src $TempKeep -Force -ErrorAction SilentlyContinue
                }
            }
        }.GetNewClosure().Invoke($Dossier, $TempKeep, $garde) | Out-Null
        Bon "Fichiers personnels sauvegardes"
    } catch {
        Stop2 "Impossible de sauvegarder les fichiers personnels."
    }
} else {
    Info "Nouvelle installation dans : $Racine"
}

Ensure-Directory $Racine
Bon "Dossier pret"

# --- 2) Telechargement du client ---
Titre "3/5  Telechargement"
Info "Recuperation de l'archive principale..."

try {
    Invoke-SpinnerTask -Message "Telechargement du client..." -ScriptBlock {
        param($ZipUrl, $TempZip)
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", "Nexium-Installer")
        try {
            $wc.DownloadFile($ZipUrl, $TempZip)
        } finally {
            $wc.Dispose()
        }
    }.GetNewClosure().Invoke($ZipUrl, $TempZip) | Out-Null
} catch {
    Stop2 "Telechargement impossible. Verifie ta connexion internet."
}

if (-not (Test-Path $TempZip) -or (Get-Item $TempZip).Length -lt 1MB) {
    Stop2 "Le fichier telecharge est invalide."
}

$taille = [math]::Round((Get-Item $TempZip).Length / 1MB)
Bon ("Telecharge (${taille} Mo)")

# --- 3) Installation des fichiers ---
Titre "4/5  Installation des fichiers"

if (Test-Path $Dossier) {
    try {
        Invoke-SpinnerTask -Message "Suppression de l'ancienne version..." -ScriptBlock {
            param($Dossier)
            Remove-Item $Dossier -Recurse -Force -ErrorAction SilentlyContinue
        }.GetNewClosure().Invoke($Dossier) | Out-Null
        Bon "Ancienne version supprimee"
    } catch {
        Stop2 "Impossible de remplacer l'ancienne version. Ferme Discord et reessaie."
    }
}

try {
    Invoke-SpinnerTask -Message "Decompression des fichiers..." -ScriptBlock {
        param($TempZip, $Racine)
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::ExtractToDirectory($TempZip, $Racine)
    }.GetNewClosure().Invoke($TempZip, $Racine) | Out-Null
} catch {
    Stop2 "Decompression impossible : $($_.Exception.Message)"
}

Remove-Item $TempZip -Force -ErrorAction SilentlyContinue
if (-not (Test-Path $Dossier)) {
    Stop2 "Le dossier attendu est introuvable apres decompression."
}

Bon "Fichiers installes"

# Remise des fichiers personnels
if ($maj) {
    $dest = Join-Path $Dossier "resources\equicord"
    if (Test-Path $dest) {
        try {
            Invoke-SpinnerTask -Message "Restauration des reglages precedents..." -ScriptBlock {
                param($TempKeep, $dest)
                Get-ChildItem $TempKeep -ErrorAction SilentlyContinue | ForEach-Object {
                    Copy-Item $_.FullName $dest -Force -ErrorAction SilentlyContinue
                }
            }.GetNewClosure().Invoke($TempKeep, $dest) | Out-Null
            Bon "Reglages precedents conserves"
        } catch {
            Show-SpinnerWarn "Restauration des reglages impossible, sans consequence"
        }
    }
    Remove-Item $TempKeep -Recurse -Force -ErrorAction SilentlyContinue
}

# --- 4) Recuperation du lanceur (.exe) ---
Titre "5/5  Finalisation"

$exeUrl = $null
$exeNom = $null

try {
    Info "Recherche du lanceur dans les releases..."
    $head = @{ "User-Agent" = "Nexium-Installer"; "Accept" = "application/vnd.github+json" }
    $rel  = Invoke-RestMethod -Uri $ApiUrl -Headers $head -TimeoutSec 30

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
        Invoke-SpinnerTask -Message "Telechargement du lanceur..." -ScriptBlock {
            param($exeUrl, $exePath)
            $wc = New-Object System.Net.WebClient
            $wc.Headers.Add("User-Agent", "Nexium-Installer")
            try {
                $wc.DownloadFile($exeUrl, $exePath)
            } finally {
                $wc.Dispose()
            }
        }.GetNewClosure().Invoke($exeUrl, $exePath) | Out-Null

        Bon "Lanceur installe : $exeNom"
    } catch {
        Souci "Telechargement du lanceur impossible"
        $exeUrl = $null
    }
}

if (-not $exeUrl) {
    Souci "Le lanceur n'a pas pu etre recupere automatiquement."
    Info  "Telecharge-le ici : https://github.com/$Repo/releases"
    Info  "Puis place le .exe dans : $Dossier"
    Start-Process "https://github.com/$Repo/releases"
}

# --- 5) Raccourci sur le Bureau ---
$exeLocal = Get-ChildItem $Dossier -Filter *.exe -ErrorAction SilentlyContinue | Select-Object -First 1
if ($exeLocal) {
    try {
        Invoke-SpinnerTask -Message "Creation du raccourci Bureau..." -ScriptBlock {
            param($exeFullName, $Dossier)
            $lien = Join-Path ([Environment]::GetFolderPath("Desktop")) "Nexium Client.lnk"
            $sh   = New-Object -ComObject WScript.Shell
            $sc   = $sh.CreateShortcut($lien)
            $sc.TargetPath       = $exeFullName
            $sc.WorkingDirectory = $Dossier
            $sc.Description      = "Discord avec les mods Nexium"
            $sc.Save()
        }.GetNewClosure().Invoke($exeLocal.FullName, $Dossier) | Out-Null

        Bon "Raccourci cree sur le Bureau"
    } catch {
        Souci "Raccourci non cree (sans consequence)"
    }
}

# --- Fin ---
Write-Blank
Write-Host ("  " + ("=" * 62)) -ForegroundColor Green
Write-Host "  Installation terminee" -ForegroundColor Green
Write-Host ("  " + ("=" * 62)) -ForegroundColor Green
Write-Blank
Info "Emplacement : $Dossier"
Write-Blank

if ($exeLocal) {
    $rep = Read-Host "  Lancer Nexium maintenant ? (O/n)"
    if ($rep -eq "" -or $rep -match "^[oOyY]") {
        Start-Process -FilePath $exeLocal.FullName -WorkingDirectory $Dossier
        Bon "Nexium demarre"
        Start-Sleep -Seconds 2
    }
} else {
    Read-Host "  Appuie sur Entrée pour fermer" | Out-Null
}
