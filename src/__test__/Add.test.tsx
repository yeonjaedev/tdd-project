const addTwoNumbers = (a: number, b: number) => {
    return a + b;
};
describe('addTwoNumbers', () => {
    test('1 and 2 make 3', () => {
        // Arrange
        const argA = 1;
        const argB = 2;
        const assert = 3;

        //Act
        const result = addTwoNumbers(argA, argB);

        //Assert
        expect(result).toBe(assert);
    });
});
