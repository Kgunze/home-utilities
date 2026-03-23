$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 0)
$listener.Start()
$port = ($listener.LocalEndpoint).Port
$listener.Stop()

$process = Start-Process `
  -FilePath python `
  -ArgumentList @("-m", "http.server", "$port") `
  -WorkingDirectory $PSScriptRoot `
  -PassThru

Write-Output "Home Utilities is running at http://127.0.0.1:$port/"
Write-Output "PID: $($process.Id)"
