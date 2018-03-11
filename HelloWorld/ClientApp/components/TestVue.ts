import Vue from "vue";
import _ from "lodash";
import axios from "axios";

export default Vue.extend({
	template: "#test-temp",
	data() {
		return {
			question: '',
			answer: 'Пока вы не зададите вопрос, я не могу ответить!'
		};
	},
	watch: {
		// эта функция запускается при любом изменении вопроса
		question(newQuestion, oldQuestion) {
			this.answer = 'Ожидаю, когда вы закончите печатать...'
			this.getAnswer();
		}
	},
	methods: {
		getAnswer:
			 _.debounce(
				function() {
					if (this.question.indexOf('?') === -1) {
						this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
						return;
					}
					this.answer = 'Думаю...';
					var vm = this;
					axios.get('https://yesno.wtf/api')
						.then(function(response) {
							vm.answer = _.capitalize(response.data.answer);
						})
						.catch(function(error) {
							vm.answer = 'Ошибка! Не могу связаться с API. ' + error
						});
				},
				// Это число миллисекунд, которое мы ждём, после того как пользователь прекратил печатать.
				500
			)
		}
	}
);