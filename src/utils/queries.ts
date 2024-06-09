import db from '../config/db';

export const findContacts = async (
    email: string,
    phoneNumber: string
): Promise<any> => {
    const [rows] = await db.query(
        `
        SELECT * FROM Contact WHERE  email = ? OR phoneNumber = ? AND deletedAt IS NULL`,
        [email, phoneNumber]
    );
    return rows;
};

export const insertContact = async (
    email: string = '',
    phoneNumber: string = '',
    linkPrecedence = 'primary',
    linkedId = null
): Promise<any> => {
    const [result] = await db.execute<any>(
        `
        INSERT INTO Contact (email, phoneNumber, linkPrecedence,linkedId) 
        VALUES (?, ?, ?, ?)
    `,
        [email, phoneNumber, linkPrecedence, linkedId]
    );
    return result;
};
