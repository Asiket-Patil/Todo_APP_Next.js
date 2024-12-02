import { connectDb } from "@/lib/config/db";
import { NextResponse } from "next/server";
import TodoModel from "@/lib/models/todoModel";

const LoadDB=async()=>{
    await connectDb();
}

LoadDB();

export async function GET(request){
    const todos = await TodoModel.find({})
    return NextResponse.json({todos:todos})
}

export async function POST(request){
    const {title,description}=await request.json();

    await TodoModel.create({
        title,
        description
    })

    return NextResponse.json({msg:"Todo Created"})
}


export async function DELETE(request) {
  

  const mongoId = request.nextUrl.searchParams.get('mongoId'); 
  if (!mongoId) {
    return NextResponse.json({ msg: "Todo ID is required" }, { status: 400 });
  }

  try {
    await TodoModel.findByIdAndDelete(mongoId); 
    return NextResponse.json({ msg: "Todo Deleted" });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to delete todo", error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
    
  
    const mongoId = request.nextUrl.searchParams.get('mongoId'); 
    if (!mongoId) {
      return NextResponse.json({ msg: "Todo ID is required" }, { status: 400 });
    }
  
    try {
      await TodoModel.findByIdAndUpdate(mongoId, { $set: { isCompleted: true } });
      return NextResponse.json({ msg: "Todo Updated" });
    } catch (error) {
      return NextResponse.json({ msg: "Failed to update todo", error: error.message }, { status: 500 });
    }
  }
  
