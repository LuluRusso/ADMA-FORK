import { Global, Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { Appointment } from "../pages/appointment/appointment.entity";
import { Neighborhood } from "../data-entities/entities/neighborhood.entity";
import { Specie } from "../data-entities/entities/specie.entity";
import { Reason } from "../data-entities/entities/reason.entity";
import { Castration } from "../pages/castration/castration.entity";
import { IncomeForm } from "../pages/income-form/income-form.entity";
import { ResidualNumber } from "../data-entities/entities/residual-number.entity";

dotenv.config()

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            inject: [],
            useFactory: async () => {
                try{
                    const dataSource = new DataSource({
                        type:"postgres",
                        url: process.env.DB_HOST,
                        entities:[Appointment, Neighborhood, Specie, Reason, Castration, IncomeForm, ResidualNumber],
                        synchronize: true,
                    });
                    await dataSource.initialize();
                    console.log("DataSource initialized successfully");
                    return dataSource;
                }
                catch(error){
                    throw error
                }
            }

        }
    ],
    exports:[DataSource]
})
export class DataSourceModule{}