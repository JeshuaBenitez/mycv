import { getCurrencies } from './currencies';

describe('currencies', () => {
    it ('should return the supportes currencies', () => {
        const result = getCurrencies();

        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');
    })
})