<?php

$p = "";

if(isset($_GET['p'])) {
	$p = $_GET['p'];
} else {
	$p = "Player";
}

?>

<?php include("Core/Components/Header.php"); ?>

<body>

	<section id='p'>
		<?php include("Core/View/" .  $p . ".php"); ?>
	</section>
	
</body>

<?php include("Core/Components/Footer.php"); ?>

</html>