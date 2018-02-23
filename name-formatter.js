/*
* Formatting Names
*
* At Udacity, our products have a worldwide audience, so we often
* have to deal with varied input data and cultural norms. One example
* of this is formatting names for display.
*
* In many East Asian languages, namely Chinese, Japanese and
* Korean (CJK), the family name (surname) comes before the given name
* and the two are not separated by a space (ex. "李晓东", where "李" is
* the surname and "晓东" is the given name). In many cultures which
* use the latin alphabet, a person may have one or more given names,
* which proceed the surname and are separated by spaces (ex. "Eric
* Louis Morris", where "Eric" and "Louis" are the two given names and
* "Morris" is the surname).
*
* For this exercise, we would like you to do three things:
*
* 1) Write the formatName() function to take each part of the user's
* name as an argument and format it apropriately. The input should
* be in the order: primary given name, additional given name(s)
* (optional), surname.
* 2) Write the formatInitials() function to:
* a) Return the capitalized first character of each name if the name
* consists of Latin (non-CJK) characters.
* b) Return the full family name if the name consists of CJK characte
rs
* 3) Add at least 3 tests to account for additional edge cases
*
*/
function formatName() {
  if (arguments.length < 2) {
    throw "Too few arguments";
  }
  var args = Array.from(arguments);
  if (args.every(containsLatinChars)) {
    return formatLatinName.apply(null, args);
  } else {
    return formatCJKName.apply(null, args);
  }
}

function containsLatinChars(str) {
  return /[\u0000-\u007F]/.test(str);
}

function formatLatinName() {
  var separator = ' ';
  return Array.from(arguments).join(separator);
}

function formatCJKName() {
  var separator = '';
  return Array.from(arguments).reverse().join(separator);
}

function formatInitials() {
  if (arguments.length < 2) {
    throw "Too few arguments";
  }
  var args = Array.from(arguments);
  if (args.every(containsLatinChars)) {
    return formatLatinInitials.apply(null, args);
  } else {
    return formatCJKInitials.apply(null, args);
  }
}

function formatLatinInitials() {
  var separator = '';
  return Array.from(arguments).map(arg => arg[0].toUpperCase()).join(separator);
}

function formatCJKInitials() {
  var args = Array.from(arguments);
  return args[args.length - 1];
}

/*
* Testing Code
*/
function test(received, expected) {
  if (received === expected) {
    console.log(`[*] Test Passed - ${expected}`);
    return;
  }
  console.log(`[ ] Expected "${expected}", but received "${received}"`);
}

console.log('\nFormats the given name and surname correctly');
test(formatName('Eric', 'Morris'), 'Eric Morris');
test(formatName('晓东', '李'), '李晓东');

console.log('\nHandles an optional middle name');
test(formatName('Eric', 'Louis', 'Morris'), 'Eric Louis Morris');

console.log('\nOutputs a single initial for CJK and all for non-CJK');
test(formatInitials('Eric', 'Morris'), 'EM');
test(formatInitials('Eric', 'Louis', 'Morris'), 'ELM');
test(formatInitials('晓东', '李'), '李');

console.log('\nAdditional edge cases');
console.log('\nShort name');
try { test(formatName('Madonna'), 'Madonna'); } catch (err) { console.log(err); }

console.log('\nLong names');
test(formatName('Mel', 'Colmcille', 'Gerard', 'Gibson'), 'Mel Colmcille Gerard Gibson');
test(formatName('Kiefer', 'William', 'Frederick', 'Dempsey', 'George', 'Rufus', 'Sutherland'), 'Kiefer William Frederick Dempsey George Rufus Sutherland');

console.log('\nKorean name');
test(formatName('찬욱', '박'), '박찬욱');
test(formatName('민식', '최'), '최민식');

console.log('\nKorean initials');
test(formatInitials('찬욱', '박'), '박');
test(formatInitials('민식', '최'), '최');

console.log('\nLower case initials');
test(formatInitials('eric', 'morris'), 'EM');
