const { program } = require('commander');
const fs = require('fs');

// Налаштовуємо параметри командного рядка
program
  .requiredOption('-i, --input <path>', 'Input file path')  // обов'язковий параметр
  .option('-o, --output <path>', 'Output file path')        // не обов'язковий параметр
  .option('-d, --display', 'Display result in console');    // не обов'язковий параметр

program.parse(process.argv);
const options = program.opts();

// Перевіряємо чи існує файл
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Читаємо дані з файлу
const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));

// Фільтруємо потрібні категорії
const income = data.find(item => item.txt === "Доходи, усього");
const expenses = data.find(item => item.txt === "Витрати, усього");

const result = {
  "Доходи, усього": income ? income.value : "Не знайдено",
  "Витрати, усього": expenses ? expenses.value : "Не знайдено"
};

// Виводимо результат у файл або в консоль
if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(result, null, 2));
} else {
  // Якщо не вказано параметр -o, записуємо в файл output.json
  fs.writeFileSync('output.json', JSON.stringify(result, null, 2));
}

if (options.display) {
  console.log(result);
}
