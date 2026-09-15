Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $root "public/favicon.png"
$publicPath = Join-Path $root "public"

function Save-SquarePng([int]$size, [string]$name) {
  $source = [System.Drawing.Image]::FromFile($sourcePath)
  try {
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($source, 0, 0, $size, $size)
        $bitmap.Save((Join-Path $publicPath $name), [System.Drawing.Imaging.ImageFormat]::Png)
      } finally { $graphics.Dispose() }
    } finally { $bitmap.Dispose() }
  } finally { $source.Dispose() }
}

Save-SquarePng 48 "favicon-48x48.png"
Save-SquarePng 192 "favicon-192x192.png"
Save-SquarePng 180 "apple-touch-icon.png"
Save-SquarePng 256 "favicon-256x256.png"

# ICO containing a PNG-compressed 256px Elladria icon for /favicon.ico crawlers.
$pngPath = Join-Path $publicPath "favicon-256x256.png"
$png = [System.IO.File]::ReadAllBytes($pngPath)
$stream = New-Object System.IO.MemoryStream
$writer = New-Object System.IO.BinaryWriter($stream)
try {
  $writer.Write([UInt16]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]1)
  $writer.Write([Byte]0)
  $writer.Write([Byte]0)
  $writer.Write([Byte]0)
  $writer.Write([Byte]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]$png.Length)
  $writer.Write([UInt32]22)
  $writer.Write($png)
  [System.IO.File]::WriteAllBytes((Join-Path $publicPath "favicon.ico"), $stream.ToArray())
} finally {
  $writer.Dispose()
  $stream.Dispose()
}
