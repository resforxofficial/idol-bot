import fs from 'fs';

/**
 * 
 * @param {string} filePath fie path
 * @returns {string[]}
 */
function readLinesFromFile(filePath) {
    try {
        // 파일의 내용을 읽어오기
        const data = fs.readFileSync(filePath, 'utf-8');
        // 내용을 줄 단위로 나누기
        const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0); // 빈 줄 제거
        return lines;
    } catch (error) {
        console.error('Error reading the file:', error);
        return [];
    }
}

export default readLinesFromFile;
