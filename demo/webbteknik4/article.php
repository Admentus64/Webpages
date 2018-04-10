<?php
	
	class Article {
		
		private $name;
		private $category;
		private $text;
		private $date;
		private $signature,
		
		public setName(newName) { $this->name = newName(); }
		public setCategory(newCategory) { $this->category = newCategory(); }
		public setText(newText) { $this-text = newText(); }
		public setDate(newDate) { $this-date = newDate(); }
		public setSignature(newSignature) { $this->signature = newSignature(); }
		
		public getName() { echo $this->name; }
		public getCategory() { echo $this->category; }
		public getText() { echo $this-text; }
		public getDate() { echo $this-date; }
		public getSignature() { echo $this->signature; }
		
	}
	
?>