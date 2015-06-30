<?php
/* Proxy for bypassing origin issues with ajax calls during FEDev */

/*
Notes: Current state of the restful api is that it doesn't provide 
       the "Access-control-allow-origin:*" & friends headers
       for the "preflight" request made for json type data ajax calls.
       To circumvent this current CORS issue with the server config, we
       have this API proxy which will run locally, avoiding all single
       origin issues. Obviously this is not ideal and the server config
       would need to be adjusted if the FE code (read api consumer) ever 
       lives on a different host/domain.
*/

error_reporting(E_ALL);

$cookieJar = 'api-proxy.cookies.txt';

$url = 'https://projectbpprd.performnet.com:443/projectb/ws/buzz/1';

// $endPoint = '/authentication/authenticate.biws';
// $data = '{"username": "courtc","password": "buzzer","token": ""}';

// $endPoint = '/feed/popularFeed.biws';
// $data = '{"userId": 262221}';

$endPoint = $_GET['endPoint']; //'/feed/popularFeed.biws';
$data = file_get_contents('php://input');

if($endPoint == '/authentication/authenticate.biws' && file_exists($cookieJar)) {
    unlink($cookieJar) or die("could not unlink $cookieJar");
}

function fetch($url, $data) {
    global $cookieJar;

    $ch = curl_init($url.$endPoint);

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Connection: Keep-Alive'
    ));
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt( $ch, CURLOPT_COOKIEJAR,  $cookieJar );
    curl_setopt( $ch, CURLOPT_COOKIEFILE, $cookieJar );

    $data = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    $result = array(
      'data' => $data,
      'status' => $status
    );

    curl_close($ch);

    return $result;
}

$res = fetch($url.$endPoint, $data);

http_response_code($res['status']);
header('Content-Type: application/json');

echo $res['data'];

?>