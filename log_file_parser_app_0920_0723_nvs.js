// 代码生成时间: 2025-09-20 07:23:47
import { Component } from '@angular/core';

// 日志文件解析组件
@Component({
  selector: 'app-log-file-parser',
  templateUrl: './log-file-parser.component.html',
  styleUrls: ['./log-file-parser.component.css']
})
export class LogFileParserComponent {
  // 日志文件内容
  fileContent: string = '';
  // 解析后的日志数据
  parsedLogs: any[] = [];
  // 错误消息
  errorMessage: string = '';

  // 构造函数
  constructor() { }

  // 文件选择处理函数
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      this.errorMessage = 'Please select a file.';
      return;
    }
    this.readFile(file);
  }

  // 读取文件内容
  readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.fileContent = e.target.result;
      this.parseLogFile();
    };
    reader.onerror = (e) => {
      this.errorMessage = 'Unable to read file.';
    };
    reader.readAsText(file);
  }

  // 解析日志文件
  parseLogFile(): void {
    try {
      // 假设日志文件是以换行符分隔的，每行是一个日志条目
      const lines = this.fileContent.split('
');
      this.parsedLogs = lines.map(line => this.parseLine(line));
    } catch (error) {
      this.errorMessage = 'Error parsing log file: ' + error.message;
    }
  }

  // 解析单行日志
  parseLine(line: string): any {
    // 根据实际日志格式进行解析，这里只是一个示例
    const parts = line.split(' ');
    return {
      timestamp: parts[0],
      level: parts[1],
      message: parts.slice(2).join(' ')
    };
  }

  // 清除错误消息
  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}
