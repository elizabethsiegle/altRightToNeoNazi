var elements = document.getElementsByTagName('*');

var altrightToOther = [
    [['alt-right', 'Alt-right', 'Alt-Right', 'altright', 'alt-Right', 'Altright', 'alt right', 'Alt Right', 'Alt right'], 'neo-nazi']
];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(altright2Other, modifyWords) {
    return altright2Other.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(altrightToOther, identity).concat(makeRegexToTargetWords(dodgersToOther, capitalizeFirstLetter)).concat(makeRegexToTargetWords(dodgersToOther, toUpperCase));

function replaceTextWithRegexes(text, toOther) {
    for (var k = 0; k < toOther.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}