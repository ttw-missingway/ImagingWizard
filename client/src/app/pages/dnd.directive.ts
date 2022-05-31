import { HostBinding } from '@angular/core';
import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
    selector: '[appDnD]'
})

export class DndDirective{
    @HostBinding('class.fileover') fileOver: boolean = false;

    constructor(){
        
    }

    @HostListener('dragover', ['$event']) onDragOver(evt: Event){
        evt.preventDefault();
        evt.stopPropagation();

        console.log('Drag Over');
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt: Event){
        evt.preventDefault();
        evt.stopPropagation();

        console.log('Drag Leave');
    }

    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent){
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
        const files = evt.dataTransfer?.files;
        if (files != undefined){
            if (files.length > 0) {
                console.log(`you dropped ${files.length} files`);
            }
        }  
    }
}