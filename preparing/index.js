chalk = require('chalk')

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + 1;
}

function show(array) {
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            switch (array[i][j]) {
                case 1:
                    process.stdout.write(chalk.green(arr[i][j]) + ' ')
                    break;

                case 2:
                    process.stdout.write(chalk.white(arr[i][j]) + ' ')
                    break;

                case 3:
                    process.stdout.write(chalk.yellow(arr[i][j]) + ' ')
                    break;
            }
        }
        process.stdout.write('\n')
    }
}


// Функция для нахождения описания второго наименее представленного типа местности
function getSecondLeastCommonTypeDescription(arr, leastCommonType) {
    let typeCounts = [0, 0, 0]; // массив для сохранения количества ячеек каждого типа местности
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let type = arr[i][j];
            if (type !== leastCommonType) {
                typeCounts[type - 1]++;
            }
        }
    }
    let secondLeastCommonType = typeCounts.indexOf(Math.min(...typeCounts)) + 1; // находим индекс наименьшего количества
    let description = '';
    if (secondLeastCommonType === 1) {
        description = 'Второй наименее представленный тип местности: лес';
    } else if (secondLeastCommonType === 2) {
        description = 'Второй наименее представленный тип местности: горы';
    } else {
        description = 'Второй наименее представленный тип местности: пустыни';
    }
    return description;
}



let arr = []
for (let i = 0; i < 10; ++i) {
    arr[i] = new Array(10);
}

for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
        arr[i][j] = getRandInt(1, 3);
    }
}

show(arr)
console.log(getSecondLeastCommonTypeDescription(arr))

