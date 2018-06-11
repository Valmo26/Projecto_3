window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /json.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();                             
				reader.onload = function(e) {
					fileDisplayArea.innerText = reader.result;
                                        let lines = e.target.result;
                                        var newArr = JSON.parse(lines); 
                                        alert(newArr.informacionAdicional);
				}
				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
            }