<!doctype html>

<html>
	
	<?php include "indexCode.php";?>
	
	<head>
		<meta charset="UTF-8">
		<title> Pensionat Sjöstugan - Förfrågan om rumsbokning </title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	
	<body>
		<div id="wrapper">
			
			<header>
				<h1> Pensionat Sjöstugan </h1>
			</header>
			
			<main>
				<h3> Förfrågan om rumsbokning </h3>
				
				<form id="booking" method="post" action="<?php echo $_SERVER["PHP_SELF"];?>">
					<fieldset id="room"> <legend> Val av rum </legend>
						<label>
							<input type="radio" name="room" value="Single Room" checked>
							Enkelrum (600 kr)
						</label> <br>
						
						<label>
							<input type="radio" name="room" value="Double Room">
							Dubbelrum (800 kr)
						</label> <br>
						
						<label>
							<input type="radio" name="room" value="Family Room">
							Familjrum (950 kr)
						</label>
						
						<label>
							--- Antal personer:
							<select name="persons">
								<option value="3"> 3 </option>
								<option value="4"> 4 </option>
								<option value="5"> 5 </option>
								<option value="6"> 6 </option>
							</select>
							(anges endast for familjerum)
						</label>
					</fieldset>
					
					<fieldset id="date"> <legend> Datum och antal nätter </legend>
						<label>
							* Ankomstdatum:
							<input type="date" name="arrivaldate">
						</label>
						
						<label>
							* Antal nätter:
							<select name="nights">
								<option value="1"> 1 </option>
								<option value="2"> 2 </option>
								<option value="3"> 3 </option>
								<option value="4"> 4 </option>
								<option value="5"> 5 </option>
								<option value="6"> 6 </option>
								<option value="7"> 1 vecka </option>
								<option value="14"> 2 veckor </option>
							</select>
						</label>
					</fieldset>
					
					<fieldset id="extra"> <legend> Tillägg </legend>
						<label>
							<input type="checkbox" name="internet" value="Yes">
							Internet (40 kr)
						</label> <br>
						
						<label>
							<input type="checkbox" name="parking" value="Yes">
							Parkering (80 kr)
						</label> <br>
						
						<label>
							<input type="checkbox" name="sea" value="Yes">
							Sjöutsikt (100 kr)
						</label>
						<p> Kostnader per dygn. </p>
					</fieldset>
					
					<fieldset id="customer"> <legend> Kund </legend>
						<label for="name"> * Namn: </label>
						<input id="name" type="text" name="name" size="40">
						
						<label for="street"> * Gatuadress: </label>
						<input id="street" type="text" name="street" size="40">
						
						<label for="zipcode"> * Postnummer: </label>
						<input id="zipcode" type="text" name="zipcode" size="5" maxlength="5">
						
						<label for="city"> * Ort: </label>
						<input id="city" type="text" name="city" size="40">
						
						<label for="telephone"> Telefon: </label>
						<input id="telephone" type="tel" name="telephone" size="40">
						
						<label for="email"> * E-post: </label>
						<input id="email" type="email" name="email" size="40">
					</fieldset>
					
					<p id="submitbtn">
						<input type="submit" value="Skicka" >
					</p>
				</form>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>
	
</html>