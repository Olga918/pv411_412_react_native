$ErrorActionPreference = "SilentlyContinue"
Add-Type @"
using System; using System.Runtime.InteropServices; using System.Text;
public class W {
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr h, IntPtr z, int x, int y, int cx, int cy, uint f);
  public delegate bool E(IntPtr h, IntPtr l);
  [DllImport("user32.dll")] public static extern bool EnumWindows(E f, IntPtr l);
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr h, StringBuilder t, int c);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
}
"@
$hwnd = [IntPtr]::Zero
[W]::EnumWindows({
  param($h,$l)
  $sb = New-Object Text.StringBuilder 256
  [void][W]::GetWindowText($h,$sb,256)
  if ($sb.ToString() -like "Android Emulator - *" -and [W]::IsWindowVisible($h)) { $script:hwnd = $h; return $false }
  return $true
}, [IntPtr]::Zero) | Out-Null
if ($hwnd -ne [IntPtr]::Zero) {
  [void][W]::SetWindowPos($hwnd, [IntPtr]::Zero, 20, 20, 360, 720, 0x0044)
}
