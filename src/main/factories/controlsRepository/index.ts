import {
    GetControlsRepositoryController,
    PostControlsRepositoryController,
    UpdateControlsRepositoryController,
    DeleteControlsRepositoryController
} from "../../../interfaces/controllers/aplications/controlsRepository";
import {SqlControlsRepository} from "../../../interfaces/adpters/db/useCases/controlsRepository/sqlControlsRepository";
import {SqlDrivePrisma} from "../../../infra/db/techs/prisma/sqlDrive/sqlDrivePrisma";

export const getControlsRepositoryFactory = (): any => {
    return new GetControlsRepositoryController(new SqlControlsRepository(new SqlDrivePrisma()))
}

export const postControlsRepositoryFactory = (): any => {
    return new PostControlsRepositoryController()
}

export const updateControlsRepositoryFactory = (): any => {
    return new UpdateControlsRepositoryController()
}

export const deleteControlsRepositoryFactory = (): any => {
    return new DeleteControlsRepositoryController()
}
