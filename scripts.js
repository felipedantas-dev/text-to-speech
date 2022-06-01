const speech = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;

const selectLanguages = document.getElementById('languages');

const linkLanguages = "https://raw.githubusercontent.com/citation-style-language/locales/969d9567ac3d69cdb5eccdaa9143a57d44168016/locales.json";

$(document).ready(function() {
    Promise.resolve(getLanguages()).then(function(response) {
        let languages = Object.entries(response["language-names"]);
        languages.map(function(item) {
            let option = document.createElement("option");
            option.value = item[0];
            option.text = item[1][0];
            selectLanguages.add(option);

            if (item[0].toLowerCase() == window.navigator.language.toLowerCase()) {
                selectLanguages.value = item[0];
            }
        });

        selectLanguages.removeAttribute("disabled");
        document.getElementById('send-message').removeAttribute("disabled");
    });
});

async function getLanguages() {
    let languages = await fetch(linkLanguages).then(res => {
        return res.json();
    })
    .catch(error => {
        throw new Error(error);
    });

    return languages;
}

function textToSpeech (text, language)
{
    speech.text = text;
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;
    speech.lang = language;

    try {
        synth.speak(speech);
    } catch (error) {
        throw new Error(error);
    }
}