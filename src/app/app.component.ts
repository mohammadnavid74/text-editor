import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import QuillBetterTable from 'quill-better-table';
import imageResize from 'quill-image-resize-module';

Quill.register({ 'modules/better-table': QuillBetterTable }, true);
Quill.register('modules/imageResize', imageResize);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuillModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('editorWrapper', { static: true }) editorWrapper!: ElementRef;
  quill: any;
  @ViewChild('outputDiv') outputDiv!: ElementRef;

  public editorData: string = '';
  public isModalOpen: boolean = false; // وضعیت نمایش Modal
  public rows: number = 3; // مقدار پیش‌فرض برای ردیف‌ها
  public columns: number = 3; // مقدار پیش‌فرض برای ستون‌ها

  ngAfterViewInit() {
    this.quill = new Quill(this.editorWrapper.nativeElement, {
      theme: 'snow',

      modules: {
        imageResize: {},
        table: false,
        'better-table': {
          operationMenu: {
            items: {
              unmergeCells: {
                text: 'Another unmerge cells name',
              },
            },
          },
        },
        toolbar: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
          ['link', 'image', 'video'],
          ['blockquote', 'code-block'],
          ['clean'],
        ],
        keyboard: {
          bindings: QuillBetterTable.keyboardBindings,
        },
      },
    });

    this.quill.root.innerHTML = this.editorData;

    this.quill.on('text-change', () => {
      this.editorData = this.quill.root.innerHTML;
    });
  }

  openTableDialog() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  insertTable() {
    const tableModule = this.quill.getModule('better-table');
    tableModule.insertTable(this.rows, this.columns);
    this.closeModal();
  }

  lo() {
    this.outputDiv.nativeElement.innerHTML = this.editorData;
    console.log(this.editorData);
  }
}
