import {
  ProspectDataSource,
  CustomError,
  ServerResponseEntity,
  EditProspectDto,
} from "../../../domain";
import { prisma } from "../../../data";
import {
  ProspectEntityMapper,
  ProspectListEntityMapper,
} from "../../mappers/prospect.mapper";
import { CreateProspectDto, IdDto } from "../../../domain";
import {
  QuotationEntityMapper,
  QuotationOfProspectEntityMapper,
} from "../../mappers";

export class ProspectDataSourceImpl implements ProspectDataSource {
  async showAllProspects(): Promise<ServerResponseEntity["props"]> {
    //posibilidad de añadir filtros a la búsqueda
    try {
      //Aqui va la lógica de showAllProspect : obtener prospectos
      const prospectArray = await this.getAllProspects();
      if (!prospectArray) throw CustomError.notFound("Prospects not found");
      const arrayProspectToEntity = prospectArray.map(
        ProspectListEntityMapper.prospectsToJson
      );

      return ServerResponseEntity.fromObject({
        message: "Prospects retrieved successfully",
        status: "success",
        data: { prospect_list: arrayProspectToEntity },
        error: null,
      });
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  async showProspectDetail(
    idDto: IdDto
  ): Promise<ServerResponseEntity["props"]> {
    try {
      const { id } = idDto;
      const prospect = await this.getProspectById(id);
      //Condición para evitar valor nulo de prospect.
      if (!prospect) throw CustomError.notFound("Prospect not found");
      //mapper a Json
      const prospectToEntity = ProspectEntityMapper.prospectsToJson(prospect);

      return ServerResponseEntity.fromObject({
        message: "Prospects retrieved successfully",
        status: "success",
        data: { prospect: prospectToEntity },
        error: null,
      });
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  async createProspect(
    createProspectDto: CreateProspectDto
  ): Promise<ServerResponseEntity["props"]> {
    try {
      //Destructurar el dto para comprobar el email
      const {
        user_id,
        organization_name,
        contact_person,
        type,
        email,
        identity_document,
        whatsapp,
        first_contact_date,
        last_contact_date,
      } = createProspectDto;
      const existProspect = await this.getProspectByDni(identity_document);
      if (existProspect)
        throw CustomError.badRequest("Prospect dni already exist");

      const prospect = await prisma.prospect.create({
        data: {
          user_id_fk: user_id,
          organization_name,
          contact_person,
          type,
          email,
          identity_document,
          whatsapp,
          first_contact_date,
          last_contact_date,
        },
      });
      return ServerResponseEntity.fromObject({
        message: "Prospect created successfully",
        status: "success",
        data: null,
        error: null,
      });
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  async editProspect(
    prospectId: IdDto,
    updatedFields: EditProspectDto
  ): Promise<ServerResponseEntity["props"]> {
    try {
      const { id } = prospectId;
      const existProspect = await this.getProspectById(id);
      //Si el prospecto no existe se lanza error
      if (!existProspect) throw CustomError.notFound("Prospect not found");

      const updatedProspect = await prisma.prospect.update({
        where: { id: id },
        data: updatedFields,
      });

      return ServerResponseEntity.fromObject({
        message: "Prospect updated successfully",
        status: "success",
        data: null,
        error: null,
      });
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  async showProspectQuotation(
    prospectId: IdDto
  ): Promise<ServerResponseEntity["props"]> {
    try {
      const { id } = prospectId;
      const existprospectQuotations = await this.getQuotationsByProspectId(id);
      if (!existprospectQuotations)
        throw CustomError.notFound("Quotations not found");

      const arrayQuotationstoEntity = existprospectQuotations.map(
        QuotationOfProspectEntityMapper.quotationToJson
      );

      return ServerResponseEntity.fromObject({
        message: "Prospect quotations retrieved successfully",
        status: "success",
        data: { quotations: arrayQuotationstoEntity },
        error: null,
      });
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  //METODOS CRUD
  private async getAllProspects() {
    try {
      const prospectArray = await prisma.prospect.findMany({
        select: {
          id: true,
          organization_name: true,
          contact_person: true,
          type: true,
          identity_document: true,
          whatsapp: true,
          last_contact_date: true,
        },
      });
      return prospectArray;
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  private async getProspectByDni(dni: string) {
    try {
      const prospect = await prisma.prospect.findFirst({
        where: { identity_document: dni },
      });
      return prospect;
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  private async getProspectById(id: number) {
    try {
      const prospect = await prisma.prospect.findUnique({
        where: { id },
        select: {
          id: true,
          organization_name: true,
          contact_person: true,
          type: true,
          email: true,
          identity_document: true,
          whatsapp: true,
          first_contact_date: true,
          last_contact_date: true,
        },
      });
      return prospect;
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }

  private async getQuotationsByProspectId(id: number) {
    try {
      const prospectQuotations = await prisma.quotation.findMany({
        where: { prospect_id_fk: id },
        select: {
          id: true,
          // service_id_fk: true,
          net_amount: true,
          discount: true,
          quotation_date: true,
          igv_included: true,
          type_currency: true,
          service: {
            select: {
              service_name: true,
            },
          },
        },
      });
      return prospectQuotations;
    } catch (error) {
      console.log(`${error}`);
      throw CustomError.internalServer("Internal server error");
    }
  }
}
