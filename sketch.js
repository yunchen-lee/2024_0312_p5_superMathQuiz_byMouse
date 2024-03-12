// let zh_btn, en_btn; // switch the language and reset the quiz

// // p5.js speech library https://idmnyu.github.io/p5.js-speech/
// let speechRec;
// let lang, continuous, interim;

// quiz
let quiz;
// let speechAlpha = 255;


function setup() {
    createCanvas(windowWidth, windowHeight);

    // quiz init
    quiz = new Quiz();
    quiz.setup();

    // language switch btn setting
    // zh_btn = createButton('中文');
    // zh_btn.position(width / 2 - 60, 99);
    // en_btn = createButton('English');
    // en_btn.position(width / 2 - 10, 100);

    // zh_btn.mousePressed(() => {
    //     quiz.inputLang = 'zh-CN';
    //     quiz.setup();
    // });

    // en_btn.mousePressed(() => {
    //     quiz.inputLang = 'en-GB';
    //     quiz.setup();
    // });


}


function draw() {
    background(220);
    quiz.draw();

    // // draw language setting
    // if (quiz.inputLang == 'zh-CN') {
    //     push();
    //     noFill();
    //     stroke(0);
    //     strokeWeight(4);
    //     let x = width / 2 - 60 + 1;
    //     let y = 99 + 28;
    //     line(x, y, x + 40, y);
    //     pop();
    // } else {
    //     push();
    //     noFill();
    //     stroke(0);
    //     strokeWeight(4);
    //     let x = width / 2 - 10;
    //     let y = 100 + 28;
    //     line(x, y, x + 60, y);
    //     pop();
    // }

}


class Quiz {
    constructor(args) {
        this.timer = '00:00:00';
        this.startTimer;
        this.waitTimer;
        this.quizes = [];
        // this.answers = [];
        // this.answers_zh = [];
        // this.answers_en = [];
        this.indexList = [];
        this.index;
        this.counter;
        // this.input = 'GO!';
        // this.inputLang = 'en-GB';
    }

    setup() {
        // speechRec = new p5.SpeechRec(this.inputLang, gotSpeech);
        // continuous = true;
        // interim = true;
        // speechRec.start(continuous, interim);

        // reset quiz
        this.timer = '00:00:00';
        this.quizes = [];
        this.answers = [];
        // this.answers_zh = [];
        // this.answers_en = [];
        this.indexList = [];
        // this.input = 'GO!';

        /// * Create quiz and answer * ///
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                let q_add = str(i) + '+' + str(j);
                let a_add = str(i + j);
                let q_sub = str(i + j) + '-' + str(i);
                let a_sub = str(j);
                let q_mul = str(i) + 'x' + str(j);
                let a_mul = str(i * j);

                this.quizes.push(q_add);
                this.quizes.push(q_sub);
                this.quizes.push(q_mul);

                this.answers.push(a_add);
                this.answers.push(a_sub);
                this.answers.push(a_mul);

                // create zh answers
                // this.answers_zh.push(this.numToZh(a_add));
                // this.answers_zh.push(this.numToZh(a_sub));
                // this.answers_zh.push(this.numToZh(a_mul));

                // this.answers_en.push(this.numToEn(a_add));
                // this.answers_en.push(this.numToEn(a_sub));
                // this.answers_en.push(this.numToEn(a_mul));
            }
        }

        /// * shuffle index * ///
        for (let i = 0; i < this.quizes.length; i++) {
            this.indexList.push(i);
        }
        this.indexList = shuffle(this.indexList);

        /// * counter reset * ///
        this.counter = -1;
        this.updateIndex();
    }


    // jump to the next  
    updateIndex() {
        this.counter++;
        if (this.counter >= 20) speechRec.stop();
        this.index = this.indexList[this.counter];
        this.waitTimer = millis();

        console.log(this.quizes[this.index] + "=" + this.answers[this.index])
    }


    // convert num to zh-CN label
    // numToZh(num) {
    //     let len = num.length;
    //     let zhnum = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    //     let result = '';
    //     for (let i = len - 1; i > -1; i--) {
    //         if (i == len - 1) {
    //             if (num[i] != 0)
    //                 result = "".concat(zhnum[num[i]], result)
    //         } else {
    //             result = "".concat(zhnum[0], result);
    //             if (num[i] != '1') {
    //                 result = "".concat(zhnum[num[i]], result);
    //             }
    //         }
    //     }
    //     // console.log(result);
    //     return (result);
    // }

    // numToEn(num) {
    //     let len = num.length;
    //     let ennum_zero2nine = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    //     let ennum_teen = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    //     let ennum_ty = ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    //     let result = '';
    //     for (let i = len - 1; i > -1; i--) {
    //         if (i == len - 1) {
    //             if (num[i] != 0)
    //                 result = "".concat(ennum_zero2nine[num[i]], result)
    //         } else {

    //             if (num[i] == 1) {
    //                 result = ennum_teen[num[i + 1]];
    //             } else {
    //                 result = ennum_ty[num[i] - 1].concat(' ', result);
    //             }
    //         }
    //     }

    //     return result;
    // }



    // draw quiz
    draw() {
        push();
        translate(width / 2, height / 2);
        textAlign(CENTER, CENTER);


        // draw title and quiz
        if (this.counter == -1) {
            textSize(120);
            text('READY?', 0, 0);
        } else if (this.counter >= 20) {
            textSize(120);
            text('DONE!', 0, 0);
        } else {
            textSize(180);
            text(this.quizes[this.index], 0, 0);
        }


        // draw GO! and speech resultString
        // textSize(24);
        // push();
        // fill(0, 0, 0, speechAlpha);
        // speechAlpha -= 3;
        // if (this.input == 'GO!') fill(0, 0, 0, 255);
        // text(this.input, 0, 100);
        // pop();


        // draw timer
        textSize(18)
        text(this.timer, 0, -120);


        // draw progress bar
        rectMode(CENTER);
        let maxQuiz = 20;
        for (let i = 0; i < maxQuiz; i++) {
            let span = 15;
            let x = -span * maxQuiz / 2 + span * i;
            let y = 65;
            stroke(255);
            noFill();
            if (i < this.counter) {
                fill(255);
            }
            if (this.counter >= 20) fill(0, 255, 0);
            rect(x, y, span * 0.8, 10);

        }




        pop();

        // update timer
        if (this.counter < 20 && this.input != 'GO!') {
            let timeSpan = millis() - this.startTimer;
            let s = str(int(timeSpan / 1000) % 60).padStart(2, '0');
            let m = str(int(timeSpan / 60000)).padStart(2, '0');
            let mi = str(int(timeSpan / 10) % 100).padStart(2, '0');
            this.timer = m + ":" + s + ":" + mi;
        }
    }
}


function mouseClicked() {
    if (quiz.counter <= 0) {
        quiz.startTimer = millis();
    }
    quiz.updateIndex();

}

// speech callback
// function gotSpeech() {
//     if (speechRec.resultValue && millis() - quiz.waitTimer > 800) {

//         if (quiz.input == "GO!") {
//             quiz.startTimer = millis();
//         }
//         quiz.input = speechRec.resultString;
//         speechAlpha = 255;
//         console.log(quiz.input);

//         let m = match(speechRec.resultString, quiz.answers[quiz.index]);
//         if (m == null) {
//             if (quiz.inputLang == 'zh-CN') {
//                 m = match(speechRec.resultString, quiz.answers_zh[quiz.index]);
//             } else if (quiz.inputLang == 'en-GB') {
//                 m = match(speechRec.resultString, quiz.answers_en[quiz.index]);
//             }
//         }
//         if (m != null) {
//             quiz.updateIndex();
//         }
//     }
// }