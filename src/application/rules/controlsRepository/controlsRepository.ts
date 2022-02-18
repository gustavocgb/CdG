import {Controls, ControlsEntity} from "../../../domain/rules/controls";

export interface get {
    select?: {}
    where?: ControlsEntity
}

export interface update {
    id?: ControlsEntity
    value?: ControlsEntity
}

export abstract class ControlsRepository {

    protected controls: any

    constructor() {
        this.controls = Controls.createControls()
    }

    abstract getControlsByGeoapiId(data: get): Promise<any>
    abstract getControlsAllByGeoapiId(data?: get): Promise<any>
    abstract update(data: update): Promise<any>

    Controls(): Controls {
        return this.controls
    }
}
