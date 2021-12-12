function send() {
	// let e = window.event;
	window.event.preventDefault();
	const form = {
		inputs: document.querySelectorAll('input'),
		errFields: document.querySelectorAll('.err-p'),
		cookies: {},
		send: true,
		startForm() {
			for (let input of this.inputs) {
				if (!input.value && input.id != "name") {
					input.addEventListener('keyup', () => {
						console.log("working");
						if (input.value) {
							this.err(input.id, "remove");
						}
					});
					this.err(input.id, "add");
					this.send = false;
				}
			}
			if (this.send) {
				this.setCookie();
			}
		},
		err(id, method) {
			for (let field of this.errFields) {
				if (field.dataset.id === id) {
					console.log(id);
					if (method === "add") {
						field.classList.add('isVisible');
					} else if (method === "remove") {
						field.classList.remove('isVisible');
					}
				}
			}
		},
		setCookie() {
			this.inputs.forEach(element => {
				element.addEventListener('focus', () => {
					element.value = this.writeField(element.id);
					this.err(element.id, "remove")
				});
				this.cookies[element.id] = element.value;
				element.value = "";
			});
			document.cookie = `data=${JSON.stringify(this.cookies)}`;
			alert(JSON.stringify(this.cookies));
			console.log(JSON.stringify(this.cookies));
		},
		getCookie(name) {
			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		writeField(name) {
			const cookie = JSON.parse(this.getCookie("data"));
			return cookie[name]
		}
	}
	form.startForm();
}
