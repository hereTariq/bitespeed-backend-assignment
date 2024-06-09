import ErrorHandler from '../utils/errorHandler';
import { findContacts, insertContact } from '../utils/queries';

interface Contact {
    id: number;
    phoneNumber: string | null;
    email: string | null;
    linkedId: number | null;
    linkPrecedence: 'primary' | 'secondary';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export const identifyService = async (data: {
    email: string;
    phoneNumber: string;
}) => {
    try {
        const { email, phoneNumber } = data;

        let rows = await findContacts(email, phoneNumber);

        let primaryContact = null;
        let secondaryContacts = [];

        // if (rows.length > 0) {
        primaryContact = rows?.find(
            (row: Contact) =>
                row.linkPrecedence === 'primary' &&
                row.email === email &&
                row.phoneNumber === phoneNumber
        );

        if (!primaryContact) {
            primaryContact = rows.find(
                (row: Contact) => row.linkPrecedence === 'primary'
            );

            if (!primaryContact && email && phoneNumber) {
                const result = await insertContact(email, phoneNumber);
                primaryContact = {
                    id: result.insertId,
                    email,
                    phoneNumber,
                    linkedId: null,
                    linkPrecedence: 'primary',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                };
            } else {
                secondaryContacts = rows.filter(
                    (row: Contact) =>
                        row.linkPrecedence === 'secondary' &&
                        row.email === email &&
                        row.phoneNumber === phoneNumber
                );

                if (!secondaryContacts.length && email && phoneNumber) {
                    await insertContact(
                        email,
                        phoneNumber,
                        'secondary',
                        primaryContact?.id
                    );
                }
            }
        }
        return await getResponse(email, phoneNumber);
    } catch (error: any) {
        throw new Error(error);
    }
};

const getResponse = async (email: string, phoneNumber: string) => {
    let rows = await findContacts(email, phoneNumber);

    const allContacts = rows.filter(
        (row: Contact) =>
            row.linkPrecedence === 'primary' ||
            row.linkPrecedence === 'secondary'
    );

    let primaryContact = allContacts.find(
        (row: Contact) => row.linkPrecedence === 'primary'
    );

    let secondaryContacts = allContacts.filter(
        (row: Contact) => row.linkPrecedence === 'secondary'
    );

    const response = {
        contact: {
            primaryContactId: primaryContact?.id,
            emails: [...new Set(allContacts.map((row: Contact) => row.email))],
            phoneNumbers: [
                ...new Set(allContacts.map((row: Contact) => row.phoneNumber)),
            ],
            secondaryContactIds: secondaryContacts
                .map((c: Contact) => c?.id)
                .filter(Boolean),
        },
    };
    return response;
};
