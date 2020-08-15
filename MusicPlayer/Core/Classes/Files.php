<?php

class Files {

	private $_filesName = array();
	private $_rootDir;

	public function __construct() {
		$this->_rootDir = $_SERVER['DOCUMENT_ROOT'] . "/MusicPlayer/Core";
	}

	public function getFiles() {
		//Avoid dots
		$filesFromDir = array_slice(scandir($this->_rootDir . "/Upload"), 2);

		foreach($filesFromDir as $files) {
			$this->_filesName[] = array('name' => $files);
		}

		echo json_encode($this->_filesName);
	}

}


?>