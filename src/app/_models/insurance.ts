export class Insurance {
    id: string;
    nameSurname: string;
    cnp: string;
    phone: string;
    mail: string;
    endDate: Date;


    constructor(id: string,
        nameSurname: string,
        cnp: string,
        phone: string,
        mail: string,
        endDate: Date
    ){
        this.id = id;
        this.nameSurname = nameSurname;
        this.cnp = cnp;
        this.phone = phone;
        this.mail = mail;
        this.endDate = endDate;
    }
}