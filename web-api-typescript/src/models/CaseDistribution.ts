import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "CaseDistribution" })
export class CaseDistribution {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("datetime")
    yearWeek: Date;
    @Column("int")
    casesWeekly: number;
    @Column("int")
    deathsWeekly: number;
    @Column("varchar")
    countriesAndTerritories: string;
    @Column("varchar")
    geoId: string;
    @Column("varchar")
    countryTerritoryCode: string;
    @Column("bigint")
    popData2019: number;
    @Column("varchar")
    continentExp: string;
    @Column("decimal")
    notificationRate: number;
    @Column("datetime")
    tsInsert: Date;
    @Column("datetime")
    tsUpdate: Date;
}