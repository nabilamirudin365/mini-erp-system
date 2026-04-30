import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Membuat Role Admin...");
  const role = await prisma.roles.create({
    data: {
      name: 'kasir'
    }
  });

  console.log("Membuat User Admin...");
  const hashedPassword = await bcrypt.hash('kasir123', 10);

  const user = await prisma.users.create({
    data: {
      username: 'kasir 1',
      email: 'kasir@gmail.com',
      password: hashedPassword,
      role_id: role.id
    }
  });

  console.log("=========================================");
  console.log("SEDDING SELESAI! Silakan login dengan:");
  console.log("Email    : " + user.email);
  console.log("Password : kasir123");
  console.log("=========================================");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
