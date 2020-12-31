<?php
header("Access-Control-Allow-Origin: *");
$data = $_POST['image'];
if(strlen(strstr($data,"image/png")) > 0) $type = "png";
if(strlen(strstr($data,"image/jpeg")) > 0) $type = "jpg";

$data = str_replace("data:image/png;base64,", "",$data);
$data = str_replace("data:image/jpeg;base64,", "",$data);
//echo $data; exit;
$data = base64_decode($data);
$name_file = "img/".time()."_".md5(rand(0,999999999)).".".$type;
$url['saved'] = "https://upanh.tech/".$name_file;
file_put_contents($name_file,$data);
echo json_encode($url);

?>
