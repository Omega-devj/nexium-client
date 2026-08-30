# ============================================================
#  Nexium Client - installateur automatique
#  Telecharge le client, recupere le lanceur et prepare tout.
# ============================================================

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$Repo      = "Omega-devj/nexium-client"
$ZipUrl    = "https://codeload.github.com/$Repo/zip/refs/heads/main"
$ApiUrl    = "https://api.github.com/repos/$Repo/releases/latest"
$Racine    = Join-Path $env:LOCALAPPDATA "Nexium"
$Dossier   = Join-Path $Racine "nexium-client-main"

function Titre($t) {
    Write-Host ""
    Write-Host "  $t" -ForegroundColor Cyan
    Write-Host ("  " + ("-" * 52)) -ForegroundColor DarkGray
}
function Info($t)   { Write-Host "  $t" -ForegroundColor Gray }
function Bon($t)    { Write-Host "  [OK] $t" -ForegroundColor Green }
function Souci($t)  { Write-Host "  [!]  $t" -ForegroundColor Yellow }
function Stop2($t)  { Write-Host ""; Write-Host "  [X] $t" -ForegroundColor Red; Write-Host ""; Read-Host "  Appuie sur Entree pour fermer"; exit 1 }

Clear-Host
Write-Host ""
Write-Host "   NEXIUM CLIENT" -ForegroundColor White
Write-Host "   Installation automatique" -ForegroundColor DarkGray
Write-Host ""

# --- 0) Discord doit etre ferme ---
$noms = @("Discord","DiscordCanary","DiscordPTB","DiscordDevelopment","Nexium")
$proc = Get-Process -Name $noms -ErrorAction SilentlyContinue
if (-not $proc -and (Test-Path $Dossier)) {
    $proc = Get-Process -ErrorAction SilentlyContinue | Where-Object {
        $_.Path -and $_.Path.StartsWith($Dossier, [StringComparison]::OrdinalIgnoreCase)
    }
}
if ($proc) {
    Souci "Discord est ouvert. Fermeture..."
    try { $proc | Stop-Process -Force; Start-Sleep -Seconds 2; Bon "Discord ferme" }
    catch { Stop2 "Impossible de fermer Discord. Ferme-le a la main puis relance ce script." }
}

# --- 1) Dossier d'installation ---
Titre "1/5  Preparation"
$maj = Test-Path $Dossier
if ($maj) {
    Info "Installation existante detectee : mise a jour"
    # on conserve les fichiers personnels
    $garde = @(".nexium-dev", ".nexium-update.json", ".nexium-update.log")
    $tmpG  = Join-Path $env:TEMP "nx_garde"
    New-Item -ItemType Directory -Force -Path $tmpG | Out-Null
    foreach ($g in $garde) {
        $src = Join-Path $Dossier "resources\equicord\$g"
        if (Test-Path $src) { Copy-Item $src $tmpG -Force -ErrorAction SilentlyContinue }
    }
} else {
    Info "Nouvelle installation dans : $Racine"
}
New-Item -ItemType Directory -Force -Path $Racine | Out-Null
Bon "Dossier pret"

# --- 2) Telechargement du client ---
Titre "2/5  Telechargement du client (~80 Mo)"
$zip = Join-Path $env:TEMP "nexium-client.zip"
if (Test-Path $zip) { Remove-Item $zip -Force -ErrorAction SilentlyContinue }
try {
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add("User-Agent", "Nexium-Installer")
    $wc.DownloadFile($ZipUrl, $zip)
} catch { Stop2 "Telechargement impossible. Verifie ta connexion internet." }
if (-not (Test-Path $zip) -or (Get-Item $zip).Length -lt 1MB) { Stop2 "Le fichier telecharge est invalide." }
Bon ("Telecharge (" + [math]::Round((Get-Item $zip).Length / 1MB) + " Mo)")

# --- 3) Decompression ---
Titre "3/5  Installation des fichiers"
if (Test-Path $Dossier) {
    try { Remove-Item $Dossier -Recurse -Force } catch { Stop2 "Impossible de remplacer l ancienne version. Ferme Discord et reessaie." }
}
try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($zip, $Racine)
} catch { Stop2 "Decompression impossible : $($_.Exception.Message)" }
Remove-Item $zip -Force -ErrorAction SilentlyContinue
if (-not (Test-Path $Dossier)) { Stop2 "Le dossier attendu est introuvable apres decompression." }
Bon "Fichiers installes"

# on remet les fichiers personnels conserves
if ($maj) {
    $dest = Join-Path $Dossier "resources\equicord"
    if (Test-Path $dest) {
        Get-ChildItem (Join-Path $env:TEMP "nx_garde") -ErrorAction SilentlyContinue |
            ForEach-Object { Copy-Item $_.FullName $dest -Force -ErrorAction SilentlyContinue }
        Info "Reglages precedents conserves"
    }
    Remove-Item (Join-Path $env:TEMP "nx_garde") -Recurse -Force -ErrorAction SilentlyContinue
}

# --- 4) Recuperation du lanceur (.exe) ---
Titre "4/5  Recuperation du lanceur"
$exeUrl = $null
try {
    $head = @{ "User-Agent" = "Nexium-Installer"; "Accept" = "application/vnd.github+json" }
    $rel  = Invoke-RestMethod -Uri $ApiUrl -Headers $head -TimeoutSec 30
    foreach ($a in $rel.assets) {
        if ($a.name -match "\.exe$") { $exeUrl = $a.browser_download_url; $exeNom = $a.name; break }
    }
} catch { Souci "Page des releases injoignable" }

if ($exeUrl) {
    $exePath = Join-Path $Dossier $exeNom
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", "Nexium-Installer")
        $wc.DownloadFile($exeUrl, $exePath)
        Bon "Lanceur installe : $exeNom"
    } catch { Souci "Telechargement du lanceur impossible"; $exeUrl = $null }
} 

if (-not $exeUrl) {
    Souci "Le lanceur n a pas pu etre recupere automatiquement."
    Info  "Telecharge-le ici : https://github.com/$Repo/releases"
    Info  "puis place le .exe dans : $Dossier"
    Start-Process "https://github.com/$Repo/releases"
}

# --- 5) Raccourcis ---
Titre "5/5  Finalisation"
$exeLocal = Get-ChildItem $Dossier -Filter *.exe -ErrorAction SilentlyContinue | Select-Object -First 1
if ($exeLocal) {
    $sh = New-Object -ComObject WScript.Shell

    try {
        $lien = Join-Path ([Environment]::GetFolderPath("Desktop")) "Nexium Client.lnk"
        $sc   = $sh.CreateShortcut($lien)
        $sc.TargetPath       = $exeLocal.FullName
        $sc.WorkingDirectory = $Dossier
        $sc.Description      = "Discord avec les mods Nexium"
        $sc.Save()
        Bon "Raccourci cree sur le Bureau"
    } catch { Souci "Raccourci non cree (sans consequence)" }

    # Demarrage avec Windows : un raccourci dans le dossier Demarrage de
    # l utilisateur. Rien dans le registre, rien pour les autres comptes,
    # aucun droit administrateur.
    try {
        $demarrage = [Environment]::GetFolderPath("Startup")
        $lienD = Join-Path $demarrage "Nexium Client.lnk"
        $sd = $sh.CreateShortcut($lienD)
        $sd.TargetPath       = $exeLocal.FullName
        $sd.WorkingDirectory = $Dossier
        $sd.Description      = "Nexium Client - demarre avec Windows"
        $sd.WindowStyle      = 7
        $sd.Save()
        Bon "Nexium demarrera avec Windows"
        Info "Pour l en retirer, supprime le raccourci dans :"
        Info "  $demarrage"
    } catch { Souci "Demarrage automatique non configure (sans consequence)" }
}

Write-Host ""
Write-Host "  ============================================" -ForegroundColor Green
Write-Host "   Installation terminee" -ForegroundColor Green
Write-Host "  ============================================" -ForegroundColor Green
Write-Host ""
Info "Emplacement : $Dossier"
Write-Host ""

if ($exeLocal) {
    $rep = Read-Host "  Lancer Nexium maintenant ? (O/n)"
    if ($rep -eq "" -or $rep -match "^[oOyY]") {
        Start-Process -FilePath $exeLocal.FullName -WorkingDirectory $Dossier
        Bon "Nexium demarre"
        Start-Sleep -Seconds 2
    }
} else {
    Read-Host "  Appuie sur Entree pour fermer"
}
