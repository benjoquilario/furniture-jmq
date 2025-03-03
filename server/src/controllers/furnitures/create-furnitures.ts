import { RequestHandler } from 'express';
import db from '../../db';
import { StatusCodes } from 'http-status-codes';
import { furnitureSchema } from '../../validation/furnitures';

export const createFurniture: RequestHandler = async (req, res) => {
  const {
    name,
    color,
    shape,
    pullOut,
    size,
    seater,
    price,
    withStorage,
    selectedFile,
    description,
  } = furnitureSchema.parse(req.body);

  try {
    const transformedSelectedFile = selectedFile.map(file => ({
      url: file.url,
      key: file.key,
    }));

    if (selectedFile.length === 0) {
    }

    const userId = res.locals.userId;

    // const isWithStorage = withStorage === "true" ? true : false

    const furniture = await db.furniture.create({
      data: {
        pullOut: Number(pullOut),
        name: name,
        color: color,
        shape: shape,
        size: size,
        seater: Number(seater),
        price: Number(price),
        description: description,
        measurements: '85x85',
        withStorage: withStorage,
        sellerId: userId,
        selectedFile: {
          create: transformedSelectedFile,
        },
      },
    });

    res.status(StatusCodes.CREATED).json({ furniture });
  } catch (error) {
    console.error('An error occurred while creating furniture"', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};
