export class FamilyValidator {
    /**
     * Casais heterossexuais mais velhos que os filhos 
     * com pelo menos duas filhas mulheres, ou pelo menos 
     * um filho homem, ou ainda pelo menos dois filhos homens 
     * e uma filha mulher.
     */
    itemA(arrangement) {
        const regex = /^(HM|MH)((h|m)*m(h|m)*m(h|m)*|(h|m)*h(h|m)*)$/;
        const matche = arrangement.match(regex);
        return matche !== null;
    }

    /**
     * Casais heterossexuais mais velhos que os filhos e 
     * com uma quantidade ímpar de filhas mulheres.
     */
    itemB(arrangement) {
        const regex = /^(HM|MH)(h*mh*(mh*mh*)*)$/;
        const matche = arrangement.match(regex);
        return matche !== null;
    }

    /**
     * Casais heterossexuais mais velhos que os filhos, 
     * com a filha mais velha mulher e o filho
     * mais novo homem.
     */
    itemC(arrangement) {
        const regex = /^(HM|MH)h(h|m)*m$/;
        const matche = arrangement.match(regex);
        return matche !== null;
    }

    /**
     * Casais homossexuais mais velhos que os filhos, 
     * com pelo menos seis filhos, em que os dois primeiros 
     * filhos formam um casal e os últimos também.
     */
    itemD(arrangement) {
        const regex = /^(HH|MM)(hm|mh)(m|h){2,}(hm|mh)$/;
        const matche = arrangement.match(regex);
        return matche !== null;
    }

    /**
     * Casais homossexuais mais velhos que os filhos, 
     * em que o sexo dos filhos é alternado
     * conforme a ordem de nascimento.
     */
    itemE(arrangement) {
        const regex = /^(HH|MM)(m(hm)*h?|h(mh)*m?)$/;
        const matche = arrangement.match(regex);
        return matche !== null;
    }

    /**
     * Casais homossexuais mais velhos que os filhos, 
     * com qualquer quantidade de filhos homens e mulheres, 
     * mas que não tiveram dois filhos homens consecutivos.
     */
    itemF(arrangement) {
        const regex = /^(HH|MM)(h|(m|hm)+)h?$/;
        const matche = arrangement.match(regex);
        return matche !== null;
    }

    /**
     * Arranjo de no mínimo x∈ℕ e no máximo y∈ℕ, 
     * com x>0 , y>0 , e x≤y , de adultos (Hs ou Ms) 
     * mais velhos que os filhos, com qualquer quantidade de filhos 
     * homens e mulheres, mas que os três filhos mais novos não foram homens.
     */
    itemG(x, y, arrangement) {
        const regex = new RegExp("^(?!.*hhh$)([HM]{" + x + "," + y + "})(h|m)*$");
        const matche = arrangement.match(regex);
        return matche !== null;
    }
}
