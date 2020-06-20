import {Personnel, Role} from "../entities/personnel";
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as passwordHash from "password-hash";

export const seedDatabase = async (connection: Connection) => {
    try {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Personnel)
            .values([
                { name: 'Strahinja', lastname: 'Laktovic', email: 'strahinjadevmail@gmail.com', password: passwordHash.generate('test'), role: Role.admin, serial: uuid() },
                { name: 'Operator', lastname: 'Operator', email: 'strahinjadevmail2@gmail.com', password: passwordHash.generate('test'), role: Role.operator, serial: uuid() },
                { name: 'Manager', lastname: 'Manager', email: 'strahinjadevmail3@gmail.com', password: passwordHash.generate('test'), role: Role.manager, serial: uuid() },
            ])
            .execute();
    } catch (e) {
        console.log(`Error seeding: ${e.toString()}`)
    }
};
