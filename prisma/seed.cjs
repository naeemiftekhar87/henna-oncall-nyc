const { PrismaClient } = require('../app/generated/prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const hash = bcrypt.hashSync('admin123', 12);

    const existing = await prisma.admin.findUnique({
        where: { email: 'admin@hennaoncall.com' },
    });

    if (!existing) {
        await prisma.admin.create({
            data: {
                email: 'admin@hennaoncall.com',
                password: hash,
                name: 'Jannatul',
            },
        });
        console.log('Admin seeded: admin@hennaoncall.com');
    } else {
        console.log('Admin already exists');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
