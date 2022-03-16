import React, { Component } from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {

	state = {
		activeQuestion: 0,
		answersState: null,
		quiz: [
			{
				id: 1,
				question: 'Какого цвета небо',
				rightAnswer: 2,
				answers: [
					{text: 'Чёрный', id: 1},
					{text: 'Синий', id: 2},
					{text: 'Красный', id: 3},
					{text: 'Зелёный', id: 4}
				]
			},
			{
				id: 2,
				question: 'В каком году основали Санкт-Петербург',
				rightAnswer: 3,
				answers: [
					{text: '1700', id: 1},
					{text: '1702', id: 2},
					{text: '1703', id: 3},
					{text: '1803', id: 4}
				]
			}
		]
	}

	onAnswerClickHandler = (answerId) => {

		const question = this.state.quiz[this.state.activeQuestion]

		if(question.rightAnswer === answerId) {

			this.setState({
				answersState: {[answerId]: 'success'}
			})

			const timeout = setTimeout(() => {

				if(this.isQuizFinished()) {
					console.log('Finished')
				}
				else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answersState: null
					})
				}

				clearTimeout(timeout)
			}, 1000)
		}
		else {
			this.setState({
				answersState: {[answerId]: 'error'}
			})
		}
	}

	isQuizFinished() {
		return this.state.activeQuestion +1 === this.state.quiz.length
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					<ActiveQuiz
						answers={this.state.quiz[this.state.activeQuestion].answers}
						question={this.state.quiz[this.state.activeQuestion].question}
						onAnswerClick={this.onAnswerClickHandler}
						quizLength={this.state.quiz.length}
						answerNumber={this.state.activeQuestion + 1}
						state={this.state.answersState}
					/>
				</div>
			</div>
		)
	}
}

export default Quiz
