import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("employee_db");

    const employees = await db
      .collection("employees")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(employees);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to fetch employees"
      },
      {
        status: 500
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;

    const db = client.db("employee_db");

    const employee = {
      name: body.name,
      email: body.email,
      department: body.department,
      createdAt: new Date()
    };

    const result = await db
      .collection("employees")
      .insertOne(employee);

    return Response.json({
      message: "Employee created",
      id: result.insertedId
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to create employee"
      },
      {
        status: 500
      }
    );
  }
}