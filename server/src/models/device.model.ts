import { Schema, model } from 'mongoose';

export interface DeviceInformation {
   device_id: string;
   device_model: string;
   device_os: string;
   device_os_version: string;
}

const deviceSchema = new Schema<DeviceInformation>(
   {
      device_id: {
         type: String
      },
      device_model: {
         type: String
      },
      device_os: {
         type: String
      },
      device_os_version: {
         type: String
      }
   },
   {
      timestamps: true
   }
);

const deviceModel = model<DeviceInformation>('Device', deviceSchema);
export default deviceModel;
