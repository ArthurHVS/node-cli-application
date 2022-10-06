import * as Enumerations from '../../src/utilities/enumerations';

describe("ENUMERATION VARIABLES", () => {
    it("should have some characters enumerated", async () => {
        expect(Enumerations.NO_CHAR).toBeDefined();
        expect(Enumerations.LINE_SEPARATOR).toBeDefined();
        expect(Enumerations.QUOTE_CHAR).toBeDefined();
        expect(Enumerations.SPACE_CHAR).toBeDefined();
        expect(Enumerations.AGORA_FIELD_HEADER).toBeDefined();
    })
    it("should have error messages enumerated", async () => {
        expect(Enumerations.ERROR_MESSAGES).toBeDefined();
        expect(Enumerations.ERROR_MESSAGES).toBeInstanceOf(Object)
    })
});