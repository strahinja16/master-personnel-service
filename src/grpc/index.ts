import * as grpc from 'grpc';

import { protoInit } from '../proto';
import PersonnelService from './personnel';
import {config} from "../config";

protoInit();

const port: string | number = config.grpcPort;

type StartGrpcServerType = () => void;
export const startGrpcServer: StartGrpcServerType = (): void => {
    // create a new gRPC server
    const server: grpc.Server = new grpc.Server();

    // register all the handler here...
    server.addService(PersonnelService.service, PersonnelService.implementation);

    // define the host/port for server
    server.bindAsync(
        `0.0.0.0:${ port }`,
        grpc.ServerCredentials.createInsecure(),
        (err: Error | null, port: number) => {
            if (err != null) {
                return console.error(err);
            }
            console.log(`\n🚀  gRPC listening on ${ port } on personnel-service`);
        },
    );

    // start the gRPC server
    server.start();
};

export default startGrpcServer;
