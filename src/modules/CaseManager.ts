import path from 'path';
import fs from 'fs';
import { Model } from 'mongoose';
import { IItems, IUser } from '../types';

class CaseManager {
    private path: string;
    
    constructor(path_to_case_config: string){
        this.path = path_to_case_config;
    }

    public getCaseNames(): string[]{
        let data: string[] = Object.keys(this.readConfig());
        return data;
    }

    private readConfig(){
        let data = JSON.parse(fs.readFileSync(this.path, { encoding: 'utf-8' }));
        return data;
    }

    public async syncUserCases(Items: Model<IItems>){
        let data = this.getCaseNames();
        let items = await Items.find();
        for(let i = 0; i < items.length; i++){
            if(items[i].type == 'CASE'){
                if(!data.includes(items[i].item_type)){
                    items[i].delete();
                }
            }
        }
    }

} 

export default new CaseManager(path.join(__dirname, 'cases.json'));