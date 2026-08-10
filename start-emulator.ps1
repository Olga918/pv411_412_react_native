$ErrorActionPreference = "SilentlyContinue"

$targetW = 360
$targetH = 720
$posX = 20
$posY = 20

$sdk = "$env:LOCALAPPDATA\Android\Sdk"
$emulator = "$sdk\emulator\emulator.exe"
$avd = "Pixel_10_Pro_XL"
$ini = "$env:USERPROFILE\.android\avd\$avd.avd\emulator-user.ini"

Stop-Process -Name qemu-system-x86_64 -Force
Stop-Process -Name emulator -Force
Start-Sleep -Seconds 2

@"
window.x = $posX
window.y = $posY
window.scale = -1.000000
resizable.config.id = -1
posture = 0
"@ | Set-Content -Path $ini -Encoding ASCII

Start-Process -FilePath $emulator -ArgumentList "-avd", $avd

Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public class Win32 {
  public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int count);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
}
"@

function Resize-MainEmulatorWindow {
  $found = [IntPtr]::Zero
  [Win32]::EnumWindows({
    param($h, $l)
    $sb = New-Object System.Text.StringBuilder 256
    [void][Win32]::GetWindowText($h, $sb, 256)
    if ($sb.ToString() -like "Android Emulator - *" -and [Win32]::IsWindowVisible($h)) {
      $script:found = $h
      return $false
    }
    return $true
  }, [IntPtr]::Zero) | Out-Null

  if ($found -ne [IntPtr]::Zero) {
    [void][Win32]::SetWindowPos($found, [IntPtr]::Zero, $posX, $posY, $targetW, $targetH, 0x0044)
    return $true
  }
  return $false
}

for ($i = 0; $i -lt 30; $i++) {
  Start-Sleep -Seconds 2
  if (Resize-MainEmulatorWindow) { break }
}

for ($i = 0; $i -lt 12; $i++) {
  Start-Sleep -Seconds 3
  Resize-MainEmulatorWindow | Out-Null
}
