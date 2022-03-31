import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from '@angular/forms';
import { BaseService } from "../../services/base.service";

export abstract class AbstractForm {

    gridCols = 4;
    gridRowHeight = "3:1";
    gridGutterSize = "30px";

    id = 0;

    editing = false;

    constructor(protected route: ActivatedRoute,
        private service: BaseService,
        protected router: Router) {

    }

    protected init() {
        this.id = +this.route.snapshot.paramMap.get("id");

        if (this.id == 0)
            this.setEditMode(true);

        if (this.id != 0) {
            this.setEditMode(false);
            this.loadEntityOnForm();
        }
    }

    setEditMode(mode: boolean) {
        this.editing = mode;
        if (this.editing)
            this.getFormGroup().enable();
        else
            this.getFormGroup().disable();
    }

    private loadEntityOnForm() {
        this.service.retrieve(this.id).subscribe(
            (result) => this.getFormGroup().patchValue(result)
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

    protected abstract getResourceRoute(): string;
    protected abstract getFormGroup(): FormGroup;
}