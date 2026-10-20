
let score = 0;
let count = 0
let score2 = 0;
let pass = "123456";
let good = "ضعيف";
let last;
let target = 10;
let code = Answer.getid("details").textContent;
let words = [];

function bad (num) {
    const sing1 = [
        "Ail",
        "Alex",
        "Mody",
        "Ahmed",
        "Youssef",
        "Mustafa"
    ];
    let sing2 = [
        "2026",
        "1234",
        "ABS",
        "Egypt",
        "Password",
        "Haker"
    ];
    for (let i = 0; i < num; i++) {
        let pass2 = sing1[Answer.rand(0, sing1.length-1)] + sing2[Answer.rand(0, sing2.length-1)];
        for (let m = 0; m < words.length; m++) {
            let d = words[m][0];
            if (pass2 == d) {
                pass2 = sing1[Answer.rand(0, sing1.length-1)] + sing2[Answer.rand(0, sing2.length-1)];
            }
            else {
                words.push([pass2, 'ضعيف']);
                break;
            }
        }
    }
}

function medium (num) {
    let sing1 = [
        "pa",
        "m0",
        "("
    ];
    let syms = [
        "@@",
        "__",
        "--",
        "&&",
        "$$",
        "##",
        "!!",
        "??"
    ];
    let sing2 = [
        "w0rd",
        "dy",
        ")"
    ];
    let pass2 = "";
    pass2 = sing1[Answer.rand(0, sing1.length-1)] + syms[Answer.rand(0, syms.length-1)] + sing2[Answer.rand(0, sing2.length-1)];
    for (let i = 0; i < num; i++) {
        let index = 0;
        for (let m = 0; m < words.length; m++) {
            if (pass2 == words[m][0]) {
                pass2 = "";
                pass2 = sing1[Answer.rand(0, sing1.length-1)] + syms[Answer.rand(0, syms.length-1)] + sing2[Answer.rand(0, sing2.length-1)];
                m = m - 1;
            } else {
                index++;
            }
        }
        if (index >= words.length) {
            words.push([pass2, 'متوسط']);
        }
    }
}

function good2 (num) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789@#$%";
    let pass2 = "";
    for (let k = 0; k < 5; k++) {
        pass2 += chars[Answer.rand(0, chars.length-1)] + numbers[Answer.rand(0, numbers.length-1)];
    }
    for (let i = 0; i < num; i++) {
        pass2 = "";
        for (let k = 0; k < 5; k++) {
            pass2 += chars[Answer.rand(0, chars.length-1)] + numbers[Answer.rand(0, numbers.length-1)];
        };
        let index = 0;
        for (let m = 0; m < words.length; m++) {
            if (pass2 == words[m][0]) {
                pass2 = "";
                for (let k = 0; k < 5; k++) {
                    pass2 += chars[Answer.rand(0, chars.length-1)] + numbers[Answer.rand(0, numbers.length-1)];
                }
                m = m - 1;
            } else {
                index++;
            }
        }
        if (index >= words.length) {
            words.push([pass2, "قوي"]);
        }
    }
}

medium(50);
good2(50);
bad(50);

function password () {
    for (;;) {
        let p = words[Answer.rand(0, words.length - 1)];
        pass = p;
        if (last != pass[0]) {
            break;
        };
    };
    Answer.txt('input', pass[0]);
    last = pass[0];
    good = pass[1];
}

function check2 () {
    let text = `نجوم : ${score} ⭐`;
    Answer.txt("star", text);
    Answer.txt("Percentage", `${Math.round(score2)}%`);
    Answer.txt("ques", `سؤال ${count} من ${target}`);
    Answer.css('fill', 'width', `${Math.round(score2)}%`);
}

function check () {
    if (score >= target) {
        alert("لقد فزت🎉");
        target += (target / 2);
        target = Math.round(target);
        count = 0;
        score = 0;
        let text1 = `هدف : ${target} 🎯`;
        Answer.txt('Goal', text1);
        setTimeout(() => {check2()}, 250)
    }
}

function guess (g) {
    Answer.removeClass("details", "bg-[#2c4a6a]")
    if (g == good) {
        score++;
        count++;
        score2 = count*(100/target);
        Answer.txt("details", 'صح بروافو ✅');
        Answer.removeClass("details", "bg-red-500")
        Answer.addClass("details", "bg-green-500");
    }
    else {
        score -= 1;
        count -= 1;
        score2 -= 10;
        Answer.txt("details", `غلط ده كان ${good} ❌`);
        Answer.removeClass("details", "bg-green-500")
        Answer.addClass("details", "bg-red-500");
    }
    if (score < 0 || score2 < 0 || count < 0) {
        score = 0;
        score2 = 0;
        count = 0;
    }
    check();
    setTimeout(() => {
        check2();
        password();
        Answer.txt("details", code);
        Answer.removeClass("details", "bg-green-500");
        Answer.removeClass("details", "bg-red-500");
        Answer.addClass("details", "bg-[#2c4a6a]")
    }, 750);
}

password();
console.log(words.length);