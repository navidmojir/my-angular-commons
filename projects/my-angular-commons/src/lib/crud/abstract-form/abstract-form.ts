import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { BaseService } from "../../services/base.service";

export abstract class AbstractForm {

    gridCols = 4;
    gridRowHeight = "3:1";
    gridGutterSize = "30px";

    id = 0;

    editing = false;

    entity;

    constructor(protected route: ActivatedRoute,
        private service: BaseService,
        protected router: Router) {

    }

    protected init(callbackFunc?) {
        this.id = +this.route.snapshot.paramMap.get("id");

        if (this.id == 0)
            this.setEditMode(true);

        if (this.id != 0) {
            this.loadEntityOnForm(callbackFunc);
        }
    }

    setEditMode(mode: boolean) {
        this.editing = mode;
        if (this.editing)
            this.getFormGroup().enable();
        else
            this.getFormGroup().disable();
    }

    private loadEntityOnForm(callbackFunc) {
        this.service.retrieve(this.id).subscribe(
            (result) => {
                this.entity = result;
                if(callbackFunc)
                    callbackFunc();
                this.getFormGroup().patchValue(result);
                this.setEditMode(false);
            }
        );
    }

    submitForm() {
        if (this.id == 0) {
            this.service.create(this.getFormGroup().value).subscribe(
                (createdEntity) => {
                    this.setEditMode(false);
                    this.id = createdEntity['id'];
                    this.router.navigate([this.getResourceRoute(), this.id]);
                }
            );
        }
        else {
            this.service.update(this.id, this.getFormGroup().value).subscribe(
                () => this.setEditMode(false)
            );
        }

    }

    cancel() {
        if (this.id == 0)
            this.router.navigate([this.getResourceRoute()]);
        else {
            this.setEditMode(false);
        }
    }

    deleteRecord(arr, i: number) {
        arr.removeAt(i);
    }

    initializeFormArray(formArray, entities, addFunc): void {
        this.clearFormArray(formArray);
        if (entities != null) {
            for (let entry of entities) {
            addFunc(this);
            }
        }
    }
    
    clearFormArray(formArray: UntypedFormArray): void {
        while (formArray.length !== 0) {
            formArray.removeAt(0);
        }
    }

    protected abstract getResourceRoute(): string;
    protected abstract getFormGroup(): UntypedFormGroup;
}