import React, { Component } from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {

	state = {
		results: {},
		isFinished: false,
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

		if(this.state.answersState) {
			const key = Object.keys(this.state.answersState)[0]
			if(this.state.answersState[key] === 'success') {
				return
			}
		}

		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results
		if(question.rightAnswer === answerId) {

			if(!results[question.id]) {
				results[question.id] = 'success'
			}
			this.setState({
				answersState: {[answerId]: 'success'},
				results
			})

			const timeout = setTimeout(() => {

				if(this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
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
			results[question.id] = 'error'
			this.setState({
				answersState: {[answerId]: 'error'},
				results
			})
		}
	}

	isQuizFinished() {
		return this.state.activeQuestion +1 === this.state.quiz.length
	}

	onRetryHandler = () => {
		this.setState({
			activeQuestion: 0,
			answersState: null,
			isFinished: false,
			results: {}
		})
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>

					{
						this.state.isFinished
							? <FinishedQuiz results={this.state.results} quiz={this.state.quiz} onRetry={this.onRetryHandler} />
							: <ActiveQuiz
								answers={this.state.quiz[this.state.activeQuestion].answers}
								question={this.state.quiz[this.state.activeQuestion].question}
								onAnswerClick={this.onAnswerClickHandler}
								quizLength={this.state.quiz.length}
								answerNumber={this.state.activeQuestion + 1}
								state={this.state.answersState}
							/>
					}


				</div>
			</div>
		)
	}
}

export default Quiz
