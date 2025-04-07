
export class CreateAppoinmentDTO{
    owner!: string;
    home!: string;
    phone!:string;
    neighborhood!: string;
    dni!: string;
    date!: Date;
    size!: "Pequeño" | "Mediano" | "Grande";
    sex!: "Macho" | "Hembra";
    race!: "Perro" | "Gato";
}